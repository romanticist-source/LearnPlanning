const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`)
  }

  return response.json()
}

// User API
export const userApi = {
  getAll: () => fetchApi<User[]>("/users"),
  getById: (id: string) => fetchApi<User>(`/users/${id}`),
  create: (user: Omit<User, "id" | "createdAt">) =>
    fetchApi<User>("/users", {
      method: "POST",
      body: JSON.stringify({
        ...user,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }),
    }),
  update: (id: string, updates: Partial<User>) =>
    fetchApi<User>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  delete: (id: string) => fetchApi<void>(`/users/${id}`, { method: "DELETE" }),
}

// Group API
export const groupApi = {
  getAll: () => fetchApi<Group[]>("/groups"),
  getById: (id: string) => fetchApi<Group>(`/groups/${id}`),
  create: (group: Omit<Group, "id" | "createdAt">) =>
    fetchApi<Group>("/groups", {
      method: "POST",
      body: JSON.stringify({
        ...group,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }),
    }),
  update: (id: string, updates: Partial<Group>) =>
    fetchApi<Group>(`/groups/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  delete: (id: string) => fetchApi<void>(`/groups/${id}`, { method: "DELETE" }),
  addMember: (groupId: string, userId: string) =>
    fetchApi<Group>(`/groups/${groupId}`, {
      method: "PATCH",
      body: JSON.stringify({
        members: [...fetchApi<Group>(`/groups/${groupId}`).then((response) => response.members), userId],
      }),
    }),
}

// Goal API
export const goalApi = {
  getAll: () => fetchApi<Goal[]>("/goals"),
  getById: (id: string) => fetchApi<Goal>(`/goals/${id}`),
  getByUserId: (userId: string) => fetchApi<Goal[]>(`/goals?userId=${userId}`),
  getByGroupId: (groupId: string) => fetchApi<Goal[]>(`/goals?groupId=${groupId}`),
  create: (goal: Omit<Goal, "id" | "createdAt">) =>
    fetchApi<Goal>("/goals", {
      method: "POST",
      body: JSON.stringify({
        ...goal,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }),
    }),
  update: (id: string, updates: Partial<Goal>) =>
    fetchApi<Goal>(`/goals/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  delete: (id: string) => fetchApi<void>(`/goals/${id}`, { method: "DELETE" }),
}

// Message API
export const messageApi = {
  getByGroupId: (groupId: string) => fetchApi<Message[]>(`/messages?groupId=${groupId}`),
  create: (message: Omit<Message, "id" | "createdAt">) =>
    fetchApi<Message>("/messages", {
      method: "POST",
      body: JSON.stringify({
        ...message,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }),
    }),
  update: (id: string, updates: Partial<Message>) =>
    fetchApi<Message>(`/messages/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  delete: (id: string) => fetchApi<void>(`/messages/${id}`, { method: "DELETE" }),
}

// Event API
export const eventApi = {
  getAll: () => fetchApi<Event[]>("/events"),
  getByGroupId: (groupId: string) => fetchApi<Event[]>(`/events?groupId=${groupId}`),
  create: (event: Omit<Event, "id" | "createdAt">) =>
    fetchApi<Event>("/events", {
      method: "POST",
      body: JSON.stringify({
        ...event,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }),
    }),
  update: (id: string, updates: Partial<Event>) =>
    fetchApi<Event>(`/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
  delete: (id: string) => fetchApi<void>(`/events/${id}`, { method: "DELETE" }),
}

// Contribution API
export const contributionApi = {
  getByUserId: (userId: string, startDate?: string, endDate?: string) => {
    let url = `/contributionData?userId=${userId}`
    if (startDate) url += `&date_gte=${startDate}`
    if (endDate) url += `&date_lte=${endDate}`
    return fetchApi<ContributionData[]>(url)
  },
  create: (data: Omit<ContributionData, "id">) =>
    fetchApi<ContributionData>("/contributionData", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        id: crypto.randomUUID(),
      }),
    }),
  update: (id: string, updates: Partial<ContributionData>) =>
    fetchApi<ContributionData>(`/contributionData/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
}

// Type definitions
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: "student" | "instructor" | "admin"
  createdAt: string
}

export interface Group {
  id: string
  name: string
  description: string
  imageUrl: string
  createdAt: string
  createdBy: string
  members: string[]
  tags: string[]
  meetingSchedule: string
  isPublic: boolean
}

export interface Goal {
  id: string
  title: string
  description: string
  deadline: string
  progress: number
  completed: boolean
  priority: "low" | "medium" | "high"
  userId: string
  groupId?: string
  parentGoalId?: string
  subgoals?: string[]
  createdAt: string
}

export interface Message {
  id: string
  groupId: string
  userId: string
  content: string
  attachments: Attachment[]
  likes: number
  replies: string[]
  createdAt: string
}

export interface Attachment {
  type: "image" | "file"
  url: string
  name: string
  size?: number
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  type: "meeting" | "deadline" | "event"
  groupId: string
  createdBy: string
  attendees: string[]
  createdAt: string
}

export interface ContributionData {
  id: string
  userId: string
  date: string
  activityLevel: number
  studyTime: number
  tasksCompleted: number
  paizaActivities: number
}
