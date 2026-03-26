import { getAllPlaygroundForUser } from '@/modules/dashboard/action'
import AddNewButton from '@/modules/dashboard/components/add-newButton'
import AddRepo from '@/modules/dashboard/components/add-repo'
import EmptyState from '@/modules/dashboard/components/empty-state'
import ProjectTable from '@/modules/dashboard/components/project-table'
import React from 'react'

const Dashboard = async() => {
  const playground = await getAllPlaygroundForUser();
  return (
    <div className="flex flex-col items-center justify-start min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
        <AddNewButton/>
        <AddRepo/>
        <div className = "mt-10 flex flex-col justify-center items-center w-full">
          {
            playground && (playground.length === 0) ? (
              <EmptyState/>
            ) : (
              <ProjectTable 
              projects={playground || []}
              onDeleteProject={()=> {}}
              onUpdateProject={()=> {}}
              onDuplicateProject={()=> {}}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard