export interface TicketType extends Document {
  type: "Story" | "Task" | "Bug",
  key: string,
  summary: string,
  description: string,
  assignee: string,
  reporter: string,
  organisation: string,
  status: "To be picked", "In progress", "In testing", "Completed",
  due_date?: Date,
  files?: [{type: string}],
  comments?: [{type: string}]
}

export default TicketType