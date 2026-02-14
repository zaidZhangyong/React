// src/components/CustomRichEditor/index.tsx
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

// 注册图片格式调整插件
Quill.register('modules/blotFormatter', BlotFormatter);

// ==================== 类型定义 ====================
export interface CustomRichEditorProps {
    value?: string;                    // 编辑器内容（改为可选）
    onChange?: (content: string) => void; // 改为可选，更灵活
    placeholder?: string;
    height?: string | number;
    uploadApi?: string;
    disabled?: boolean;
    /** 图片上传前的钩子，可用于压缩、校验等 */
    beforeUpload?: (file: File) => Promise<File> | File | false;
    /** 自定义上传方法，返回图片URL */
    customUpload?: (file: File) => Promise<string>;
    /** 上传成功回调 */
    onUploadSuccess?: (url: string) => void;
    /** 上传失败回调 */
    onUploadError?: (error: Error) => void;
}

export interface EditorRef {
    getContent: () => string;
    getText: () => string;            // 新增：获取纯文本
    setContent: (content: string) => void;
    clear: () => void;
    insertText: (text: string) => void; // 新增：插入文本
    focus: () => void;                // 新增：聚焦
    blur: () => void;                 // 新增：失焦
    getEditor: () => Quill | null;    // 新增：获取原始实例（高级用法）
}

// ==================== 组件实现 ====================
const CustomRichEditor = forwardRef<EditorRef, CustomRichEditorProps>((props, ref) => {
    const {
        value = '',
        onChange,
        placeholder = '请输入内容...',
        height = 400,
        uploadApi = '/api/upload',
        disabled = false,
        beforeUpload,
        customUpload,
        onUploadSuccess,
        onUploadError
    } = props;

    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const isInternalChange = useRef(false); // 标记内部变更，避免循环

    // 图片上传处理（使用 useCallback 缓存）
    const handleImageUpload = useCallback(() => {
        if (disabled || !quillRef.current) return;

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async () => {
            const file = input.files?.[0];
            console.log(file)
            if (!file) return;

            try {
                // 1. 前置处理（压缩、校验等）
                let processedFile: File | false = file;
                if (beforeUpload) {
                    processedFile = await beforeUpload(file);
                    if (processedFile === false) return; // 中断上传
                }

                // 2. 执行上传
                let imageUrl: string;

                const formData = new FormData();
                formData.append('file', processedFile as File);

                const response = await fetch(uploadApi, {
                    method: 'POST',
                    body: formData,

                });

                if (!response.ok) {
                    throw new Error(`上传失败: ${response.statusText}`);
                }

                const data = await response.json();
                imageUrl = data.data;

                if (!imageUrl) {
                    throw new Error('响应中未找到图片URL');
                }

                // 3. 插入图片
                const quill = quillRef.current!;
                const range = quill.getSelection(true) || { index: quill.getLength(), length: 0 };

                quill.insertEmbed(range.index, 'image', imageUrl);
                quill.setSelection(range.index + 1, 0); // 光标移到图片后

                onUploadSuccess?.(imageUrl);

            } catch (error) {
                console.error('图片上传失败:', error);
                onUploadError?.(error as Error);
                // 可选：使用更优雅的错误提示，如 toast
                // message.error('图片上传失败，请重试');
            }
        };

        input.click();
    }, [disabled, uploadApi, beforeUpload, customUpload, onUploadSuccess, onUploadError]);

    // 初始化编辑器
    useEffect(() => {
        if (!editorRef.current || quillRef.current) return;

        // 配置工具栏（注意：handlers 要放在 toolbar 配置内部）
        const toolbarOptions = {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }], // 增加更多标题级别
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ color: [] }, { background: [] }],
                [{ script: 'sub' }, { script: 'super' }], // 新增：上下标
                ['link', 'image', 'video'],
                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ align: [] }],
                [{ direction: 'rtl' }],
                ['clean']
            ],
            handlers: {
                image: handleImageUpload // ✅ 正确的位置
            }
        };

        const quill = new Quill(editorRef.current, {
            theme: 'snow',
            placeholder,
            readOnly: disabled,
            modules: {
                toolbar: toolbarOptions, // ✅ 使用对象形式传入 handlers
                blotFormatter: {
                    // 图片调整配置
                    specs: [
                        // 可以自定义哪些 blot 支持调整
                    ],
                    overlay: {
                        style: {
                            border: '2px solid #1890ff',
                        }
                    }
                },
                // 可选：添加其他模块，如图片压缩、拖拽等
            }
        });

        quillRef.current = quill;

        // 监听内容变化（带标记防止循环）
        const handleTextChange = () => {
            const content = quill.root.innerHTML;
            // 只有真正变化时才触发（避免空字符串和 <p><br></p> 的反复切换）
            const isEmpty = content === '<p><br></p>' || content === '';
            const normalizedContent = isEmpty ? '' : content;

            isInternalChange.current = true;
            onChange?.(normalizedContent);
            // 下一帧重置标记
            requestAnimationFrame(() => {
                isInternalChange.current = false;
            });
        };

        quill.on('text-change', handleTextChange);

        // 设置初始值（延迟确保渲染完成）
        if (value) {
            quill.root.innerHTML = value;
        }

        return () => {
            quill.off('text-change', handleTextChange);
            // 彻底销毁实例，避免内存泄漏
            quill.enable(false);
            const toolbar = quill.getModule('toolbar') as any;
            if (toolbar && toolbar.container) {
                toolbar.container.innerHTML = '';
            }
            quillRef.current = null;
        };
    }, []); // 只在挂载时初始化

    // 同步外部 value 变化
    useEffect(() => {
        const quill = quillRef.current;
        if (!quill || isInternalChange.current) return;

        const currentContent = quill.root.innerHTML;
        // 标准化比较（处理 <p><br></p> 和空字符串的差异）
        const normalize = (html: string) =>
            html === '<p><br></p>' ? '' : html;

        if (normalize(currentContent) !== normalize(value || '')) {
            // 保存选区
            const selection = quill.getSelection();

            quill.root.innerHTML = value || '<p><br></p>';

            // 恢复选区（如果内容长度允许）
            if (selection) {
                const length = quill.getLength();
                quill.setSelection(
                    Math.min(selection.index, length - 1),
                    Math.min(selection.length, length - selection.index - 1)
                );
            }
        }
    }, [value]);

    // 动态切换禁用状态
    useEffect(() => {
        quillRef.current?.enable(!disabled);
    }, [disabled]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        getContent: () => {
            const html = quillRef.current?.root.innerHTML || '';
            return html === '<p><br></p>' ? '' : html;
        },
        getText: () => quillRef.current?.getText() || '',
        setContent: (content) => {
            if (quillRef.current) {
                isInternalChange.current = true;
                quillRef.current.root.innerHTML = content || '<p><br></p>';
                requestAnimationFrame(() => {
                    isInternalChange.current = false;
                });
            }
        },
        clear: () => {
            if (quillRef.current) {
                isInternalChange.current = true;
                quillRef.current.setContents([]);
                onChange?.('');
                requestAnimationFrame(() => {
                    isInternalChange.current = false;
                });
            }
        },
        insertText: (text) => {
            const quill = quillRef.current;
            if (!quill) return;
            const range = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
            quill.insertText(range.index, text);
            quill.setSelection(range.index + text.length, 0);
        },
        focus: () => quillRef.current?.focus(),
        blur: () => {
            const editor = editorRef.current?.querySelector('.ql-editor') as HTMLElement;
            editor?.blur();
        },
        getEditor: () => quillRef.current
    }), [onChange]);

    // 样式计算
    const editorStyle: React.CSSProperties = {
        height: typeof height === 'number' ? `${height}px` : height,
    };

    const containerStyle: React.CSSProperties = {
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: disabled ? '#f5f5f5' : 'white',
        opacity: disabled ? 0.7 : 1,
        transition: 'all 0.3s'
    };

    return (
        <div style={containerStyle}>
            <div ref={editorRef} style={editorStyle} />
        </div>
    );
});

CustomRichEditor.displayName = 'CustomRichEditor';

export default CustomRichEditor;