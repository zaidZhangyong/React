// components/TinyMCE/index.tsx
import { Editor } from '@tinymce/tinymce-react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

type EditorInstance = any;

export interface TinyMCEEditorRef {
    getContent: () => string;
    getText: () => string;
    setContent: (content: string) => void;
    insertContent: (content: string) => void;
    clear: () => void;
    focus: () => void;
    getEditor: () => EditorInstance | null;
}

export interface TinyMCEEditorProps {
    initialValue?: string;
    value?: string;
    onChange?: (content: string) => void;
    height?: number | string;
    placeholder?: string;
    disabled?: boolean;
    menubar?: boolean;
    toolbar?: string | string[];
    plugins?: string;
    imagesUploadUrl?: string;
    imagesUploadHandler?: (blobInfo: any, progress: (percent: number) => void) => Promise<string>;
    onFileUpload?: (file: File) => Promise<string>;
    config?: Record<string, any>;
    onInit?: (editor: EditorInstance) => void;
    className?: string;
    style?: React.CSSProperties;
}

const TinyMCEEditor = forwardRef<TinyMCEEditorRef, TinyMCEEditorProps>((props, ref) => {
    const {
        initialValue = '',
        value,
        onChange,
        height = 400,
        placeholder = '请输入内容...',
        disabled = false,
        menubar = true,
        toolbar = 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor removeformat | code preview',
        plugins = 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime help wordcount',
        imagesUploadUrl,
        imagesUploadHandler,
        onFileUpload,
        config = {},
        onInit,
        className,
        style,
    } = props;

    const editorRef = useRef<EditorInstance>(null);

    useImperativeHandle(ref, () => ({
        getContent: () => editorRef.current?.getContent() || '',
        getText: () => editorRef.current?.getContent({ format: 'text' }) || '',
        setContent: (content: string) => editorRef.current?.setContent(content),
        insertContent: (content: string) => editorRef.current?.insertContent(content),
        clear: () => editorRef.current?.setContent(''),
        focus: () => editorRef.current?.focus(),
        getEditor: () => editorRef.current,
    }));

    const handleEditorInit = (evt: any, editor: EditorInstance) => {
        editorRef.current = editor;
        console.log('TinyMCE 初始化成功');
        onInit?.(editor);
    };

    const handleEditorChange = (content: string) => {
        onChange?.(content);
    };

    // 图片上传处理
    const handleImagesUploadHandler = React.useCallback(async (blobInfo: any, progress: (percent: number) => void) => {
        if (onFileUpload) {
            const file = blobInfo.blob();
            try {
                const url = await onFileUpload(file);
                return url;
            } catch (error) {
                throw new Error('上传失败');
            }
        }
        if (imagesUploadHandler) {
            return imagesUploadHandler(blobInfo, progress);
        }
        throw new Error('未配置图片上传');
    }, [onFileUpload, imagesUploadHandler]);

    return (
        <div className={className} style={{ ...style, minHeight: height }}>
            <Editor
                // 使用 Cloudflare CDN，国内访问更快
                tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.3/tinymce.min.js"
                // 或使用官方 CDN（需要 API key）
                // tinymceScriptSrc="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js"

                licenseKey="gpl" // 开源协议，避免授权提示

                initialValue={initialValue}
                value={value}
                onInit={handleEditorInit}
                onEditorChange={handleEditorChange}
                disabled={disabled}

                init={{
                    height: typeof height === 'number' ? height : parseInt(height),
                    placeholder,
                    menubar,
                    plugins,
                    toolbar,

                    // 语言包（可选，需要单独加载）
                    // language: 'zh_CN',
                    // language_url: '/tinymce/langs/zh_CN.js',

                    // 图片上传
                    images_upload_url: imagesUploadUrl,
                    images_upload_handler: handleImagesUploadHandler,
                    automatic_uploads: true,
                    file_picker_types: 'image',

                    // 粘贴图片
                    paste_data_images: true,

                    // 样式
                    content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
              font-size: 14px; 
              line-height: 1.6; 
              padding: 10px;
            }
            img { max-width: 100%; height: auto; }
          `,

                    // 隐藏品牌信息
                    branding: false,
                    promotion: false,

                    // 状态栏
                    statusbar: true,
                    elementpath: false,

                    // 快速插入工具栏
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',

                    // 合并外部配置
                    ...config,
                }}
            />
        </div>
    );
});

TinyMCEEditor.displayName = 'TinyMCEEditor';

export default TinyMCEEditor;