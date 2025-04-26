import React, { useEffect, useState, useCallback } from 'react';

export interface Member {
  id: number;
  name: string;
  role: string;
  added: boolean;
  avatar?: string;
  department?: string;
  isExternal?: boolean;
  workplace?: string;
}

// Sample data for members
export const memberData: Member[] = [
  { id: 1, name: 'Wade Warren', role: 'Product Designer', added: true, avatar: 'https://randomuser.me/api/portraits/men/1.jpg', department: 'Design', workplace: 'London' },
  { id: 2, name: 'Darlene Robertson', role: 'Product Designer', added: true, avatar: 'https://randomuser.me/api/portraits/women/2.jpg', department: 'Design', workplace: 'London' },
  { id: 3, name: 'Cameron Williamson', role: 'Product Designer', added: true, department: 'Design', workplace: 'London' },
  { id: 4, name: 'Jerome Bell', role: 'Contractor', added: true, avatar: 'https://randomuser.me/api/portraits/men/4.jpg', department: 'Design', isExternal: true, workplace: 'London' },
  { id: 5, name: 'Amelia Right', role: 'UX Designer', added: true, department: 'Design', workplace: 'London' },
  { id: 6, name: 'Anne Behrenbrude', role: 'UX Designer', added: true, avatar: 'https://randomuser.me/api/portraits/women/5.jpg', department: 'Design', workplace: 'London' },
  { id: 7, name: 'Marcus Chen', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/men/7.jpg', department: 'Marketing', workplace: 'London' },
  { id: 8, name: 'Sophia Martinez', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/8.jpg', department: 'Marketing', workplace: 'London' },
  { id: 9, name: 'Ethan Thompson', role: 'Employee', added: true, department: 'Marketing', workplace: 'London' },
  { id: 10, name: 'Isabella Garcia', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/10.jpg', department: 'Marketing', workplace: 'London' },
  { id: 11, name: 'Lucas Anderson', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/men/11.jpg', department: 'Engineering', workplace: 'London' },
  { id: 12, name: 'Mia Rodriguez', role: 'Employee', added: true, department: 'Engineering', workplace: 'London' },
  { id: 13, name: 'Noah Wilson', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/men/13.jpg', department: 'Engineering', workplace: 'London' },
  { id: 14, name: 'Emma Taylor', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/14.jpg', department: 'Engineering', workplace: 'London' },
  { id: 15, name: 'Liam Brown', role: 'Employee', added: true, department: 'Engineering', workplace: 'London' },
  { id: 16, name: 'Olivia Davis', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/16.jpg', department: 'Engineering', workplace: 'London' },
  { id: 17, name: 'Marjory Dawes', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/17.jpg', department: 'Marketing', workplace: 'London' },
  { id: 19, name: 'Sarah Johnson', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/19.jpg', department: 'Product Management', workplace: 'Berlin' },
  { id: 20, name: 'Michael Chen', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/men/20.jpg', department: 'Product Management', workplace: 'Berlin' },
  { id: 21, name: 'Emily Wilson', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/21.jpg', department: 'Product Management', workplace: 'Berlin' },
  { id: 22, name: 'David Kim', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/men/22.jpg', department: 'Product Management', workplace: 'Munich' },
  { id: 23, name: 'Jennifer Lee', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/23.jpg', department: 'Product Management', workplace: 'Munich' },
  { id: 24, name: 'Robert Garcia', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/men/24.jpg', department: 'Product Management', workplace: 'London' },
  { id: 25, name: 'Lisa Thompson', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/25.jpg', department: 'Product Management', isExternal: true, workplace: 'London' },
  { id: 26, name: 'James Miller', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/men/26.jpg', department: 'Product Management', isExternal: true, workplace: 'Berlin' },
  { id: 27, name: 'Patricia Davis', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/women/27.jpg', department: 'Product Management', workplace: 'London' },
  { id: 28, name: 'Thomas Anderson', role: 'Employee', added: true, avatar: 'https://randomuser.me/api/portraits/men/28.jpg', department: 'Product Management', workplace: 'Munich' },
];

interface MemberTableProps {
  activeTab: string;
  onExclude: (member: { id: number; type: string; name: string; description: string; avatar?: string }) => void;
  onInclude: (id: number) => void;
  selections: Array<{
    id: number;
    type: string;
    name: string;
    description: string;
  }>;
  exclusions: Array<{
    id: number;
    type: string;
    name: string;
    description: string;
    avatar?: string;
  }>;
  conditions: Array<{
    id: number;
    field: string;
    operator: string;
    value?: string;
    values?: string[];
  }>;
  onCountsChange: (counts: { members: number; excluded: number; all: number }) => void;
  toggleOptions: {
    excludeExternal: boolean;
  };
}

const MemberTable: React.FC<MemberTableProps> = ({
  activeTab,
  onExclude,
  onInclude,
  selections,
  exclusions,
  conditions,
  onCountsChange,
  toggleOptions
}) => {
  const [displayedMembers, setDisplayedMembers] = useState<Member[]>([]);

  // Get the members that should be displayed based on selections and conditions
  const getSelectedMembers = useCallback(() => {
    let selectedMembers: Member[] = [];

    // First, handle selections
    selections.forEach(selection => {
      switch (selection.type) {
        case 'department':
          // Extract department name without the count
          const deptName = selection.name.split('(')[0].trim();
          const deptMembers = memberData.filter(m => m.department === deptName);
          selectedMembers = [...selectedMembers, ...deptMembers];
          break;

        case 'position':
          // Extract position name without the count
          const positionName = selection.name.split('(')[0].trim();
          // Find members with matching role
          const positionMembers = memberData.filter(m => m.role === positionName);
          selectedMembers = [...selectedMembers, ...positionMembers];
          break;

        case 'person':
          // Add the specific person
          const person = memberData.find(m => m.name === selection.name);
          if (person) {
            selectedMembers.push(person);
          }
          break;

        case 'workplace':
          // Extract workplace name without the count
          const workplaceName = selection.name.split('(')[0].trim();
          const workplaceMembers = memberData.filter(m => m.workplace === workplaceName);
          selectedMembers = [...selectedMembers, ...workplaceMembers];
          break;
      }
    });

    // Handle conditions separately as an OR condition
    if (conditions.length > 0) {
      // Check if any condition has values set
      const hasActiveConditions = conditions.some(condition => 
        (condition.values && condition.values.length > 0) || condition.value
      );

      if (hasActiveConditions) {
        const membersFromConditions = memberData.filter(member => {
          // All conditions must be met (AND logic within conditions)
          return conditions.every(condition => {
            // Skip conditions that don't have values set
            if ((!condition.values || condition.values.length === 0) && !condition.value) {
              return true;
            }

            switch (condition.field) {
              case 'Department':
                if (condition.operator === 'is') {
                  return condition.values?.includes(member.department || '');
                } else if (condition.operator === 'is not') {
                  return !condition.values?.includes(member.department || '');
                }
                break;
              case 'Workplace':
                if (condition.operator === 'is') {
                  return condition.values?.includes(member.workplace || '');
                } else if (condition.operator === 'is not') {
                  return !condition.values?.includes(member.workplace || '');
                }
                break;
              case 'Status':
                if (condition.operator === 'is') {
                  return condition.value === member.role;
                } else if (condition.operator === 'is not') {
                  return condition.value !== member.role;
                }
                break;
              case 'Title':
                if (condition.operator === 'is') {
                  return member.role === condition.value;
                } else if (condition.operator === 'is not') {
                  return member.role !== condition.value;
                } else if (condition.operator === 'contains') {
                  return member.role?.toLowerCase().includes((condition.value || '').toLowerCase());
                }
                break;
            }
            return true; // If condition field is not handled, don't filter
          });
        });

        // Add members from conditions to the selected members (OR logic)
        selectedMembers = [...selectedMembers, ...membersFromConditions];
      }
    }

    // Remove duplicates
    return Array.from(new Map(selectedMembers.map(m => [m.id, m])).values());
  }, [selections, conditions]);

  // Update displayed members based on active tab and filters
  useEffect(() => {
    let members: Member[] = [];
    
    switch (activeTab) {
      case 'members':
        // Show only selected members that aren't excluded
        members = getSelectedMembers().filter(member => 
          !exclusions.some(excl => excl.id === member.id) &&
          (!toggleOptions.excludeExternal || !member.isExternal)
        );
        break;
        
      case 'excluded':
        // Show only excluded members by matching IDs from memberData
        members = memberData.filter(member => 
          exclusions.some(excl => excl.id === member.id)
        );
        break;
        
      case 'all':
        // Show both selected and excluded members
        const selectedMembers = getSelectedMembers();
        members = [
          ...selectedMembers,
          ...memberData.filter(member => 
            exclusions.some(excl => excl.id === member.id) &&
            !selectedMembers.some(sel => sel.id === member.id)
          )
        ];
        break;
    }

    setDisplayedMembers(members);

    // Update counts
    if (onCountsChange) {
      const selectedMembers = getSelectedMembers();
      onCountsChange({
        members: selectedMembers.filter(m => 
          !exclusions.some(excl => excl.id === m.id) &&
          (!toggleOptions.excludeExternal || !m.isExternal)
        ).length,
        excluded: exclusions.length,
        all: selectedMembers.length + exclusions.length
      });
    }
  }, [activeTab, getSelectedMembers, exclusions, toggleOptions.excludeExternal, onCountsChange]);

  const renderMembers = () => {
    if (displayedMembers.length === 0) {
      return (
        <div className="flex flex-col items-center h-full text-gray-500 px-4 pt-[30px]">
          <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg mb-3 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="text-base mb-2">No members yet</div>
          <div className="text-sm text-center text-gray-500">
            Set conditions to add members who meet multiple requirements or directly add people, departments, workplaces etc{' '}
            <button className="text-blue-600 hover:text-blue-700">Learn more</button>.
          </div>
        </div>
      );
    }

    return displayedMembers.map((member) => (
      <div
        key={member.id}
        className="px-4 py-1.5 border-b border-gray-200 hover:bg-gray-50"
      >
        <div className="flex items-center">
          <div className="w-10">
            {member.avatar ? (
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <div className="flex-grow pl-0">
            <div className="text-sm">{member.name}</div>
          </div>
          <div className="w-[120px] flex items-center justify-center">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Active
            </span>
          </div>
          <div className="w-20 text-center">
            {exclusions.some(excl => excl.id === member.id) ? (
              <button
                onClick={() => onInclude(member.id)}
                className="px-2 py-1 text-xs font-medium rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Include
              </button>
            ) : (
              <button
                onClick={() => onExclude({
                  id: member.id,
                  type: 'person',
                  name: member.name,
                  description: member.role || 'No role',
                  avatar: member.avatar
                })}
                className="px-2 py-1 text-xs font-medium rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Exclude
              </button>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="h-full">
      {renderMembers()}
    </div>
  );
};

export default MemberTable; 