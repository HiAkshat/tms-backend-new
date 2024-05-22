export interface TicketType extends Document {
  unique_id: string,
  type: "Story" | "Task" | "Bug",
  key: string,
  summary: string,
  description: string,
  assignee_id: string,
  assignee_name: string,
  reporter_id: string,
  reporter_name: string,
  organisation: string,
  status: "To be picked", "In progress", "In testing", "Completed",
  due_date?: Date,
  files?: [{type: string}],
  is_active: boolean,
  edit_history: {
    user_name: string,
    field: string,
    old_value: string,
    new_value: string,
    time: Date
  }[]
}

export default TicketType