export type User = {
	id: string
	email: string
	displayName: string

	createdAt: string
	updatedAt: string
}

export type UserWithTeams = User & { teams: Team[] }

export type Team = {
	id: string
	name: string

	createdAt: string
	updatedAt: string
}

export type TeamWithMembers = Team & { members: User[] }
export type TeamWithProjects = Team & { projects: Project[] }

export enum ModelType {
	Metal = 'Metal',
	Plastic = 'Plastic',
}

export enum ProjectStatus {
	Pending = 'Pending',
	Trained = 'Trained',
}

export type Project = {
	id: string
	teamId: string
	indexName: string
	modelType: ModelType
	status: ProjectStatus

	name: string
	imageUrl: string
	copy: {
		cta: string
		title: string
		loading: string
		subtitle: string
		placeholder: string
	}

	origins: string[]

	createdAt: string
	updatedAt: string
}
