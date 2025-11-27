import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { markdocConfig } from '../../../../keystatic.config';

interface MarkdownContentProps {
  content: any; // Markdoc content (can be a function that returns node, or a node directly)
  className?: string;
}

export default async function MarkdownContent({ content, className }: MarkdownContentProps) {
  if (!content) return null;

  // Handle markdoc content - it can be a function that returns a node, or a node directly
  const node = typeof content === 'function' ? await content() : content;
  const markdocNode = node?.node || node;

  if (!markdocNode) return null;

  const errors = Markdoc.validate(markdocNode, markdocConfig);
  if (errors.length) {
    return null;
  }

  const renderable = Markdoc.transform(markdocNode, markdocConfig);
  const rendered = Markdoc.renderers.react(renderable, React);

  return (
    <div className={className || ''}>
      {rendered}
    </div>
  );
}

