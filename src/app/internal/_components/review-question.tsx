import type { ReactNode } from 'react';

interface ReviewQuestionProps {
  id: string;
  children: ReactNode;
}

export function ReviewQuestion({ id, children }: ReviewQuestionProps) {
  return (
    <aside
      className="ods-review-question not-prose"
      aria-label={`Câu hỏi chờ xác nhận nội dung ${id}`}
    >
      <div className="ods-review-question-heading">
        <span>Chờ xác nhận nội dung</span>
        <code>{id}</code>
      </div>
      <div className="ods-review-question-body">{children}</div>
    </aside>
  );
}
