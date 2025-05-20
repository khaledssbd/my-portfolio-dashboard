'use client';

import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData, ToolConstructable } from '@editorjs/editorjs';
import Header, { HeaderConfig } from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph, { ParagraphConfig } from '@editorjs/paragraph';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import Underline from '@editorjs/underline';
import ImageTool from '@editorjs/image';
import SpacerBlock from '../RichPostEditor/Spacer';

interface RichTextEditorProps {
  onChange: (data: OutputData) => void;
  initialData?: OutputData; // 🆕 for loading existing data
}

const cloudinaryCloudName = process.env
  .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
const cloudinaryUploadPreset = process.env
  .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;

const RichPostUpdate = ({
  onChange: onSave,
  initialData,
}: RichTextEditorProps) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        data: initialData, // 🆕 load initial data from props
        tools: {
          header: {
            class: Header as unknown as ToolConstructable,
            inlineToolbar: true,
            config: {
              placeholder: 'Write heading (h2)...',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 3,
            } as HeaderConfig,
            shortcut: 'CTRL+SHIFT+H',
            tunes: ['alignment'],
          },
          underline: Underline,
          paragraph: {
            class: Paragraph as unknown as ToolConstructable,
            inlineToolbar: true,
            config: {
              placeholder: 'Write a paragraph...',
            } as ParagraphConfig,
            tunes: ['alignment'],
          },
          list: {
            class: List as unknown as ToolConstructable,
            inlineToolbar: true,
            config: {
              placeholder: 'Write an Item...',
            },
            tunes: ['alignment'],
          },
          alignment: {
            class: AlignmentTuneTool,
            config: {
              default: 'left',
              blocks: ['header', 'paragraph', 'list'],
            },
          },
          spacer: {
            class: SpacerBlock,
            inlineToolbar: false,
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('upload_preset', cloudinaryUploadPreset);

                  const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
                  const imageAltTag = fileNameWithoutExt
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                  const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
                    {
                      method: 'POST',
                      body: formData,
                    }
                  );

                  const data = await response.json();

                  return {
                    success: 1,
                    file: {
                      url: data.secure_url,
                      alt: imageAltTag,
                    },
                  };
                },
              },
              captionPlaceholder: 'Write image caption...',
            },
          },
        },
        autofocus: true,
        onChange: async () => {
          const savedData = await editorRef.current?.save();
          if (savedData) {
            onSave(savedData);
          }
        },
      });
    }

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === 'function'
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="editorjs" />;
};

export default RichPostUpdate;
