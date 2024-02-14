export interface DailyTask {
    taskorder: string;
    title: string;
    description: string;
    id: number | string;
    username: string;
}

export interface DailyLog {
    id: number;
    title: string;
    description: string;
    day: Date;
    done: boolean;
    username: string;
    taskid: string;
}

export interface TaskGroup {
    tasks: DailyTask[]
}

export interface LogGroup {
    logs: DailyLog[]
}

export interface User {
    name: string;
    email: string;
    id: number | string;
    username: string;
}

export interface UserGroup {
    users: User[]
}

export interface Appointment {
    id: number;
    description: string;
    lastVisit: Date;
    nextVisit: Date;
}