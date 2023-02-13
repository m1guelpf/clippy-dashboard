'use client'

import { FC } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Project } from '@/types/api'
import { useRouter } from 'next/navigation'
import DropdownMenu from '@/components/DropdownMenu'
import { api, classNames, toHumanTime } from '@/lib/utils'
import { DocumentDuplicateIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon, EllipsisHorizontalIcon, FolderIcon } from '@heroicons/react/24/outline'

type Props = {
	project: Project
}

const ProjectItem: FC<Props> = ({ project }) => {
	const router = useRouter()

	return (
		<Link
			href={`/dashboard/projects/${project.id}`}
			key={project.id}
			className="group table-row hover:bg-gray-50 transition"
		>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 flex items-center space-x-2">
				<DocumentTextIcon className="w-6 h-6 text-gray-600/80" />
				<span>{project.name}</span>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 items-center [vertical-align:middle]">
				{toHumanTime(project.createdAt)}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 items-center [vertical-align:middle]">
				{toHumanTime(project.updatedAt)}
			</td>
			<td className="py-4 px-4 flex items-center justify-end">
				<DropdownMenu
					items={[
						{
							icon: PencilIcon,
							label: 'Rename Project',
						},
						{
							label: 'Duplicate Project',
							icon: DocumentDuplicateIcon,
							execute: async () => {
								toast.success('Duplicated project')
							},
						},
						{
							label: 'Delete Project',
							icon: TrashIcon,
							execute: async () => {
								await api(`/api/projects/${project.id}`, 'DELETE')

								router.refresh()
								toast.success('Project deleted')
							},
						},
					]}
				>
					{({ open }) => (
						<button
							className={classNames(
								open ? 'bg-gray-200/60' : 'md:opacity-0 hover:bg-gray-200/60',
								' py-1 px-2 rounded group-hover:opacity-100 transition'
							)}
						>
							<EllipsisHorizontalIcon className="w-5 h-5 text-gray-600" aria-hidden />
							<span className="sr-only">Edit {project.name}</span>
						</button>
					)}
				</DropdownMenu>
			</td>
		</Link>
	)
}

export default ProjectItem
