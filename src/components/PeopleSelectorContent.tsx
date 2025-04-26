import React, { useState, useMemo } from 'react';
import SearchInput from './SearchInput';
import MemberTable, { memberData, Member as MemberType } from './MemberTable';

// Tabs for the members view
const tabs = [
  { id: 'members', label: 'Members' },
  { id: 'excluded', label: 'Excluded' },
  { id: 'all', label: 'All' }
];

// Dummy data for condition options
const departmentOptions = [
  'Engineering',
  'Product Management',
  'Design',
  'Marketing',
  'Sales',
  'Customer Success',
  'Data Science',
  'DevOps',
  'Quality Assurance',
  'Human Resources',
  'Finance',
  'Legal',
  'Operations'
];

const workplaceOptions = ['Berlin', 'Munich', 'London', 'New York', 'San Francisco', 'Tokyo'];
const statusOptions = ['Onboarding', 'Active', 'On Leave', 'Terminated'];

// Update the peopleData array with correct counts
const peopleData = [
  // Teams
  { id: 401, type: 'team', name: 'Project Phoenix (8 people)', description: 'Core Product Development' },
  { id: 402, type: 'team', name: 'Atlas Initiative (6 people)', description: 'Platform Infrastructure' },
  { id: 403, type: 'team', name: 'Quantum Team (5 people)', description: 'Data Analytics' },
  { id: 404, type: 'team', name: 'Innovation Squad (7 people)', description: 'R&D' },
  { id: 405, type: 'team', name: 'Horizon Builders (4 people)', description: 'Frontend Development' },
  { id: 406, type: 'team', name: 'Nexus Group (6 people)', description: 'Backend Systems' },
  { id: 407, type: 'team', name: 'Catalyst Team (5 people)', description: 'Product Innovation' },

  // Legal Entities
  { id: 501, type: 'legal', name: 'Kolhorn Technologies GmbH', description: 'German Entity' },
  { id: 502, type: 'legal', name: 'Kolhorn Solutions Ltd.', description: 'UK Entity' },
  { id: 503, type: 'legal', name: 'Kolhorn Innovations Inc.', description: 'US Entity' },

  // Departments
  { id: 1, type: 'department', name: 'Engineering (12 people)', description: 'Department' },
  { id: 2, type: 'department', name: 'Product Management (6 people)', description: 'Department' },
  { id: 3, type: 'department', name: 'Design (5 people)', description: 'Department' },
  { id: 4, type: 'department', name: 'Marketing (5 people)', description: 'Department' },
  { id: 5, type: 'department', name: 'Sales (8 people)', description: 'Department' },
  { id: 6, type: 'department', name: 'Customer Success (5 people)', description: 'Department' },
  { id: 7, type: 'department', name: 'Data Science (4 people)', description: 'Department' },
  
  // Positions
  { id: 101, type: 'position', name: 'Software Engineer (8 people)', description: 'Position' },
  { id: 102, type: 'position', name: 'Frontend Developer (4 people)', description: 'Position' },
  { id: 103, type: 'position', name: 'Backend Developer (4 people)', description: 'Position' },
  { id: 104, type: 'position', name: 'DevOps Engineer (3 people)', description: 'Position' },
  { id: 105, type: 'position', name: 'QA Engineer (2 people)', description: 'Position' },
  { id: 106, type: 'position', name: 'Product Manager (4 people)', description: 'Position' },
  { id: 107, type: 'position', name: 'Technical Product Manager (2 people)', description: 'Position' },
  { id: 108, type: 'position', name: 'Product Designer (3 people)', description: 'Position' },
  { id: 109, type: 'position', name: 'UX Designer (2 people)', description: 'Position' },
  { id: 110, type: 'position', name: 'Data Scientist (3 people)', description: 'Position' },
  { id: 111, type: 'position', name: 'Machine Learning Engineer (2 people)', description: 'Position' },
  { id: 112, type: 'position', name: 'Solutions Architect (2 people)', description: 'Position' },
  { id: 113, type: 'position', name: 'Technical Lead (3 people)', description: 'Position' },
  { id: 114, type: 'position', name: 'Engineering Manager (2 people)', description: 'Position' },
  
  // Workplaces
  { id: 301, type: 'workplace', name: 'Berlin (4 people)', description: 'Workplace' },
  { id: 302, type: 'workplace', name: 'Munich (8 people)', description: 'Workplace' },
  { id: 303, type: 'workplace', name: 'London (12 people)', description: 'Workplace' },
  { id: 304, type: 'workplace', name: 'New York (10 people)', description: 'Workplace' },
  { id: 305, type: 'workplace', name: 'San Francisco (20 people)', description: 'Workplace' },
  { id: 306, type: 'workplace', name: 'Tokyo (5 people)', description: 'Workplace' },
  
  // People
  { id: 201, type: 'person', name: 'Wade Warren', description: 'Senior Software Engineer', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 202, type: 'person', name: 'Darlene Robertson', description: 'Product Manager', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 203, type: 'person', name: 'Cameron Williamson', description: 'UX Designer' },
  { id: 204, type: 'person', name: 'Jerome Bell', description: 'Contractor', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: 205, type: 'person', name: 'Amelia Right', description: 'Marketing Specialist' },
  { id: 206, type: 'person', name: 'Anne Behrenbrude', description: 'VP of Product', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: 207, type: 'person', name: 'Marcus Chen', description: 'Data Scientist', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { id: 208, type: 'person', name: 'Sophia Martinez', description: 'Sales Representative', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { id: 209, type: 'person', name: 'Ethan Thompson', description: 'Customer Success Manager' },
  { id: 210, type: 'person', name: 'Isabella Garcia', description: 'Frontend Developer', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: 211, type: 'person', name: 'Lucas Anderson', description: 'Backend Developer', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: 212, type: 'person', name: 'Mia Rodriguez', description: 'DevOps Engineer' },
  { id: 213, type: 'person', name: 'Noah Wilson', description: 'QA Engineer', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
  { id: 214, type: 'person', name: 'Emma Taylor', description: 'Product Designer', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
  { id: 215, type: 'person', name: 'Liam Brown', description: 'Technical Product Manager' },
  { id: 216, type: 'person', name: 'Olivia Davis', description: 'Machine Learning Engineer', avatar: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { id: 217, type: 'person', name: 'Marjory Dawes', description: 'VP of Product', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { id: 218, type: 'person', name: 'Sarah Johnson', description: 'Solutions Architect', avatar: 'https://randomuser.me/api/portraits/women/19.jpg' },
  { id: 219, type: 'person', name: 'Michael Chen', description: 'Technical Lead', avatar: 'https://randomuser.me/api/portraits/men/20.jpg' },
  { id: 220, type: 'person', name: 'Emily Wilson', description: 'Engineering Manager', avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: 221, type: 'person', name: 'David Kim', description: 'Software Engineer', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: 222, type: 'person', name: 'Jennifer Lee', description: 'UX Designer', avatar: 'https://randomuser.me/api/portraits/women/23.jpg' },
  { id: 223, type: 'person', name: 'Robert Garcia', description: 'Data Scientist', avatar: 'https://randomuser.me/api/portraits/men/24.jpg' },
  { id: 224, type: 'person', name: 'Lisa Thompson', description: 'Product Manager', avatar: 'https://randomuser.me/api/portraits/women/25.jpg' },
  { id: 225, type: 'person', name: 'James Miller', description: 'Frontend Developer', avatar: 'https://randomuser.me/api/portraits/men/26.jpg' },
  { id: 226, type: 'person', name: 'Patricia Davis', description: 'Backend Developer', avatar: 'https://randomuser.me/api/portraits/women/27.jpg' },
  { id: 227, type: 'person', name: 'Thomas Anderson', description: 'DevOps Engineer', avatar: 'https://randomuser.me/api/portraits/men/28.jpg' },
  
  // Additional people
  { id: 228, type: 'person', name: 'Alex Rodriguez', description: 'Frontend Developer' },
  { id: 229, type: 'person', name: 'Sophia Martinez', description: 'Backend Developer' },
  { id: 230, type: 'person', name: 'James Wilson', description: 'QA Engineer' },
  { id: 231, type: 'person', name: 'Emma Davis', description: 'Product Designer' },
  { id: 232, type: 'person', name: 'Lucas Anderson', description: 'Machine Learning Engineer' },
  { id: 233, type: 'person', name: 'Olivia Brown', description: 'Solutions Architect' },
  { id: 234, type: 'person', name: 'Noah Taylor', description: 'Engineering Manager' },
  { id: 235, type: 'person', name: 'Ava Garcia', description: 'Technical Product Manager' },
  { id: 236, type: 'person', name: 'Ethan Lee', description: 'Software Engineer' },
  { id: 237, type: 'person', name: 'Isabella Clark', description: 'UX Designer' },
  { id: 238, type: 'person', name: 'Mason White', description: 'Data Scientist' },
  { id: 239, type: 'person', name: 'Charlotte Hall', description: 'Product Manager' },
  { id: 240, type: 'person', name: 'Liam Turner', description: 'DevOps Engineer' },
  { id: 241, type: 'person', name: 'Amelia Scott', description: 'Frontend Developer' },
  { id: 242, type: 'person', name: 'Benjamin Green', description: 'Backend Developer' },
  { id: 243, type: 'person', name: 'Harper Adams', description: 'QA Engineer' },
  { id: 244, type: 'person', name: 'William King', description: 'Product Designer' },
  { id: 245, type: 'person', name: 'Evelyn Baker', description: 'Machine Learning Engineer' },
  { id: 246, type: 'person', name: 'Daniel Wright', description: 'Solutions Architect' },
  { id: 247, type: 'person', name: 'Victoria Young', description: 'Engineering Manager' },
  { id: 248, type: 'person', name: 'Joseph Allen', description: 'Technical Product Manager' },
  { id: 249, type: 'person', name: 'Grace Hill', description: 'Software Engineer' }
];

interface Condition {
  id: number;
  field: string;
  operator: string;
  value?: string;
  values?: string[];
}

interface SearchResultItem {
  id: number;
  type: string;
  name: string;
  description: string;
  avatar?: string;
  workplace?: string;
}

interface SearchResults {
  department: SearchResultItem[];
  position: SearchResultItem[];
  workplace: SearchResultItem[];
  person: SearchResultItem[];
}

interface Selection {
  id: number;
  type: string;
  name: string;
  description: string;
  avatar?: string;
  workplace?: string;
}

interface ExclusionItem {
  id: number;
  type: string;
  name: string;
  description: string;
  avatar?: string;
}

const PeopleSelectorContent: React.FC = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('members');
  const [tabCounts, setTabCounts] = useState<{
    members: number;
    excluded: number;
    all: number;
  }>({ members: 0, excluded: 0, all: 0 });
  
  // Selected items state
  const [selections, setSelections] = useState<Selection[]>([]);
  
  // Conditions state
  const [conditions, setConditions] = useState<Condition[]>([
    { id: 1, field: 'Department', operator: 'is', values: ['Product Management'] }
  ]);
  
  // Exclusions state
  const [exclusions, setExclusions] = useState<ExclusionItem[]>([]);
  
  // Toggle options state
  const [toggleOptions, setToggleOptions] = useState({
    excludeHireDate: false,
    hireDateMonths: '6',
    excludeExternal: false,
    excludeOnLeave: true,
    onlyIncludeStatus: false,
    statusFilter: 'Onboarding'
  });
  
  // Search states
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [exclusionSearchQuery, setExclusionSearchQuery] = useState('');
  const [showMemberSearchResults, setShowMemberSearchResults] = useState(false);
  const [showExclusionSearchResults, setShowExclusionSearchResults] = useState(false);
  
  const memberSearchResults = useMemo(() => {
    if (!memberSearchQuery) return {
      department: [],
      position: [],
      workplace: [],
      person: []
    };

    const lowerQuery = memberSearchQuery.toLowerCase();
    
    const results: SearchResults = {
      department: [],
      position: [],
      workplace: [],
      person: []
    };

    // Search through departments
    results.department = peopleData.filter(item => 
      item.type === 'department' && 
      (item.name.toLowerCase().includes(lowerQuery) || 
       item.description.toLowerCase().includes(lowerQuery))
    );

    // Search through positions
    results.position = peopleData.filter(item => 
      item.type === 'position' && 
      (item.name.toLowerCase().includes(lowerQuery) || 
       item.description.toLowerCase().includes(lowerQuery))
    );

    // Search through workplaces
    results.workplace = peopleData.filter(item => 
      item.type === 'workplace' && 
      (item.name.toLowerCase().includes(lowerQuery) || 
       item.description.toLowerCase().includes(lowerQuery))
    );

    // Search through people
    results.person = peopleData.filter(item => 
      item.type === 'person' && 
      (item.name.toLowerCase().includes(lowerQuery) || 
       item.description.toLowerCase().includes(lowerQuery))
    );

    return results;
  }, [memberSearchQuery]);

  const handleAddSelection = (item: Selection) => {
    if (!selections.some(s => s.id === item.id)) {
      setSelections(prev => [...prev, item]);
      // Remove from exclusions if present
      if (exclusions.some(excl => excl.id === item.id)) {
        setExclusions(prev => prev.filter(excl => excl.id !== item.id));
      }
    }
    setShowMemberSearchResults(false);
    setMemberSearchQuery('');
  };

  // Add remove selection handler
  const handleRemoveSelection = (id: number) => {
    setSelections(prev => prev.filter(sel => sel.id !== id));
  };

  const renderMemberSearchResults = () => {
    if (!memberSearchQuery || !showMemberSearchResults) return null;

    const sections = [
      { key: 'department' as const, title: 'Departments' },
      { key: 'position' as const, title: 'Positions' },
      { key: 'workplace' as const, title: 'Workplaces' },
      { key: 'person' as const, title: 'People' }
    ];

    return (
      <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-[400px] overflow-y-auto">
        {sections.map(section => {
          const items = memberSearchResults[section.key];
          if (!items || items.length === 0) return null;

          return (
            <div key={section.key} className="mb-4 p-2">
              <h3 className="text-sm font-medium text-gray-700 mb-2">{section.title}</h3>
              <div className="space-y-2">
                {items.map((item: SearchResultItem) => {
                  const selection: Selection = {
                    id: item.id,
                    type: item.type,
                    name: item.name,
                    description: item.description || 'No description',
                    avatar: item.avatar,
                    workplace: item.workplace
                  };

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded"
                      onClick={() => handleAddSelection(selection)}
                    >
                      <div className="flex items-center">
                        {item.type === 'person' && (
                          <div className="mr-3">
                            {item.avatar ? (
                              <img 
                                src={item.avatar} 
                                alt={item.name} 
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                {item.name.split(' ').map((n: string) => n[0]).join('')}
                              </div>
                            )}
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </div>
                      {item.workplace && (
                        <div className="text-sm text-gray-500">{item.workplace}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Add condition
  const addCondition = () => {
    const newId = conditions.length > 0 ? Math.max(...conditions.map(c => c.id)) + 1 : 1;
    setConditions([...conditions, { 
      id: newId, 
      field: 'Department', 
      operator: 'is', 
      values: [] 
    }]);
  };
  
  // Update condition
  const updateCondition = (id: number, field: string, value: any) => {
    setConditions(conditions.map(condition => {
      if (condition.id === id) {
        const updatedCondition = { ...condition, [field]: value };
        // Initialize values array for multi-select fields if changing field type
        if (field === 'field') {
          if (value === 'Department' || value === 'Workplace') {
            updatedCondition.values = [];
            delete updatedCondition.value;
          } else {
            delete updatedCondition.values;
            updatedCondition.value = '';
          }
        }
        return updatedCondition;
      }
      return condition;
    }));
  };
  
  // Remove condition
  const removeCondition = (id: number) => {
    setConditions(conditions.filter(condition => condition.id !== id));
  };
  
  // Handle exclusion search
  const handleExclusionSearch = (query: string) => {
    setExclusionSearchQuery(query);
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      const filtered = peopleData.filter(item => {
        if (item.type !== 'person') {
          return false;
        }
        
        if (exclusions.some(excl => excl.id === item.id)) {
          return false;
        }
        
        const nameMatch = item.name.toLowerCase().includes(searchTerm);
        const descriptionMatch = (item.description || '').toLowerCase().includes(searchTerm);
        
        return nameMatch || descriptionMatch;
      });
      setShowExclusionSearchResults(true);
    } else {
      const allPeople = peopleData
        .filter(item => item.type === 'person')
        .filter(item => !exclusions.some(excl => excl.id === item.id))
        .sort((a, b) => a.name.localeCompare(b.name));
      
      setShowExclusionSearchResults(true);
    }
  };
  
  // Add exclusion with proper typing
  const addExclusion = (item: typeof peopleData[0]) => {
    if (!exclusions.some(excl => excl.id === item.id)) {
      const newExclusion: ExclusionItem = {
        id: item.id,
        type: item.type,
        name: item.name,
        description: item.description || 'No description',
        avatar: item.avatar
      };
      setExclusions([...exclusions, newExclusion]);
      if (selections.some(sel => sel.id === item.id)) {
        setSelections(selections.filter(sel => sel.id !== item.id));
      }
    }
    setExclusionSearchQuery('');
    setShowExclusionSearchResults(false);
  };
  
  // Remove exclusion
  const removeExclusion = (id: number) => {
    setExclusions(exclusions.filter(item => item.id !== id));
  };
  
  // Toggle option change
  const handleToggleChange = (option: string, value: boolean) => {
    setToggleOptions({
      ...toggleOptions,
      [option]: value
    });

    if (option === 'excludeExternal') {
      const externalEmployees = memberData.filter((member: MemberType) => member.isExternal);
      
      if (value) {
        const newExclusions: ExclusionItem[] = externalEmployees
          .filter((external: MemberType) => 
            !exclusions.some(excl => excl.id === external.id)
          )
          .map((external: MemberType) => ({
            id: external.id,
            type: 'person',
            name: external.name,
            description: external.role || 'No role',
            avatar: external.avatar
          }));
        
        if (newExclusions.length > 0) {
          setExclusions([...exclusions, ...newExclusions]);
        }
      } else {
        setExclusions(exclusions.filter(excl => 
          !externalEmployees.some((external: MemberType) => external.id === excl.id)
        ));
      }
    }
  };
  
  // Update dropdown value
  const handleDropdownChange = (option: string, value: string) => {
    setToggleOptions({
      ...toggleOptions,
      [option]: value
    });
  };

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    department: false,
    position: false,
    workplace: false,
    person: false
  });

  const toggleSection = (type: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="flex h-full">
      {/* Left section - Member selection */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header with close button */}
        <div className="h-16 flex items-center justify-between pl-[100px] pr-6 border-b border-gray-200">
          <h1 className="text-xl font-medium">Select people</h1>
          <button className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6 pl-[100px]">
          <div className="max-w-3xl">
            {/* Select members section */}
            <div className="mb-8">
              <h2 className="text-base font-medium mb-1">Select members</h2>
              <p className="text-sm text-gray-500 mb-4">All selected items will be included in the group and automatically updated</p>
              
              {/* Update search input styling */}
              <div className="relative">
                <SearchInput 
                  value={memberSearchQuery}
                  placeholder="Search members..."
                  onChange={(e) => {
                    setMemberSearchQuery(e.target.value);
                    setShowMemberSearchResults(true);
                  }}
                  onFocus={() => setShowMemberSearchResults(true)}
                  className="rounded-xl" // Add rounded corners
                />
                {renderMemberSearchResults()}
              </div>
              
              {/* Selected items with updated remove functionality */}
              <div className="mt-4 space-y-2">
                {selections.map(item => (
                  <SelectedItem 
                    key={item.id}
                    type={item.type as 'person' | 'position' | 'department'} 
                    name={item.name} 
                    description={item.description}
                    onRemove={() => handleRemoveSelection(item.id)}
                  />
                ))}

                {/* Condition set */}
                <div className="bg-[#F7F7FA] rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-medium">Condition set</h3>
                      <p className="text-sm text-gray-500">People who meet all of the following conditions will be included:</p>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setConditions([])}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Condition rows */}
                  <div className="space-y-3">
                    {conditions.map(condition => (
                      <ConditionRow 
                        key={condition.id}
                        condition={condition}
                        options={{
                          departments: departmentOptions,
                          workplaces: workplaceOptions
                        }}
                        onUpdate={(field, value) => updateCondition(condition.id, field, value)}
                        onRemove={() => removeCondition(condition.id)}
                        selections={selections}
                        onAddSelection={handleAddSelection}
                      />
                    ))}
                  </div>

                  {/* Add condition button */}
                  <button 
                    className="mt-3 text-sm text-purple-700 hover:text-purple-800 flex items-center"
                    onClick={addCondition}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add condition
                  </button>
                </div>
              </div>
            </div>

            {/* Exclusions section */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-base font-medium mb-1">Exclusions</h2>
              <p className="text-sm text-gray-500 mb-4">Choose people or conditions who will be excluded from the above selection.</p>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus-within:outline-none focus-within:ring-1 focus-within:ring-purple-200 focus-within:border-purple-200">
                  <div className="flex items-center flex-wrap gap-2">
                    {exclusions.map(item => (
                      <div key={item.id} className="flex items-center bg-gray-100 rounded-md py-0.5 px-2">
                        {item.avatar ? (
                          <img 
                            src={item.avatar} 
                            alt={item.name} 
                            className="w-8 h-8 rounded-full mr-1.5"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-1.5">
                            {item.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <span className="text-sm">{item.name}</span>
                        <button 
                          className="ml-1 text-gray-500 hover:text-red-600"
                          onClick={() => removeExclusion(item.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      className="flex-1 min-w-[200px] text-gray-500 focus:outline-none"
                      placeholder={exclusions.length === 0 ? "Search people to exclude" : ""}
                      value={exclusionSearchQuery}
                      onChange={(e) => handleExclusionSearch(e.target.value)}
                      onFocus={() => {
                        setShowExclusionSearchResults(true);
                        handleExclusionSearch(''); // Show all people when focused
                      }}
                      onBlur={(e) => {
                        // Check if the click is within the dropdown
                        const relatedTarget = e.relatedTarget as HTMLElement;
                        if (!relatedTarget?.closest('.exclusion-search-dropdown')) {
                          setTimeout(() => {
                            setShowExclusionSearchResults(false);
                          }, 200);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Exclusion search results dropdown */}
                {showExclusionSearchResults && (
                  <div 
                    className="exclusion-search-dropdown absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-[200px] overflow-y-auto"
                    style={{ bottom: 'auto' }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {peopleData
                      .filter(item => 
                        item.type === 'person' && 
                        !exclusions.some(excl => excl.id === item.id) &&
                        (exclusionSearchQuery === '' || 
                         item.name.toLowerCase().includes(exclusionSearchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(exclusionSearchQuery.toLowerCase()))
                      )
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(result => (
                        <div 
                          key={result.id}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                          onClick={() => addExclusion(result)}
                        >
                          {result.avatar ? (
                            <img 
                              src={result.avatar} 
                              alt={result.name} 
                              className="w-8 h-8 rounded-full object-cover mr-3"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 mr-3">
                              {result.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{result.name}</div>
                            <div className="text-sm text-gray-500">{result.description}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Toggle options */}
              <div className="mt-4 space-y-3">
                <ToggleOption 
                  label="Exclude people with hire date within" 
                  value={toggleOptions.hireDateMonths}
                  active={toggleOptions.excludeHireDate}
                  onToggle={(value) => handleToggleChange('excludeHireDate', value)}
                  onValueChange={(value) => handleDropdownChange('hireDateMonths', value)}
                  options={['3', '6', '12', '18', '24']}
                />
                <ToggleOption 
                  label="Exclude external employees" 
                  active={toggleOptions.excludeExternal}
                  onToggle={(value) => handleToggleChange('excludeExternal', value)}
                />
                <ToggleOption 
                  label="Exclude employees on leave" 
                  active={toggleOptions.excludeOnLeave}
                  onToggle={(value) => handleToggleChange('excludeOnLeave', value)}
                />
                <ToggleOption 
                  label="Only include people with status" 
                  value={toggleOptions.statusFilter}
                  active={toggleOptions.onlyIncludeStatus}
                  onToggle={(value) => handleToggleChange('onlyIncludeStatus', value)}
                  onValueChange={(value) => handleDropdownChange('statusFilter', value)}
                  options={statusOptions}
                />
              </div>

              {/* Advanced exclusions link */}
              <button className="mt-4 text-sm text-purple-700 hover:text-purple-800">
                Switch to advanced exclusions
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-16 border-t border-gray-200 flex items-center justify-end px-6 space-x-3">
          <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm text-white bg-purple-700 rounded-md hover:bg-purple-800">
            Save
          </button>
        </div>
      </div>

      {/* Right section - Member table */}
      <div className="w-[480px] border-l border-gray-200 bg-white">
        {/* Tabs */}
        <div className="border-b border-gray-200" style={{ paddingTop: '65px' }}>
          <div className="flex px-4">
            {tabs.map(tab => {
              const count = tabCounts[tab.id as keyof typeof tabCounts];
              return (
              <button
                key={tab.id}
                className={`py-4 px-4 text-base font-medium ${
                  activeTab === tab.id
                      ? 'text-purple-700 border-b-2 border-purple-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                  {count !== undefined && (
                    <span className={`ml-2 ${activeTab === tab.id ? 'text-purple-700' : 'text-gray-400'}`}>
                      {count}
                  </span>
                )}
              </button>
              );
            })}
          </div>
        </div>

        {/* Table headers */}
        <div className="flex items-center px-4 py-2 border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500">
          <div className="w-0"></div>
          <div className="flex items-center flex-grow pl-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Employee
          </div>
          <div className="w-[120px] text-center flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582A1 1 0 004 6.868V16a1 1 0 001 1h10a1 1 0 001-1V6.868a1 1 0 00-1.046-.963L11 4.323V3a1 1 0 00-1-1H10zm4 8V7l-5-2v3h5z" clipRule="evenodd" />
            </svg>
            Status
          </div>
          <div className="w-20 text-center flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Action
          </div>
        </div>

        {/* Member table content */}
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 87px)' }}>
          <MemberTable 
            activeTab={activeTab} 
            onExclude={(member) => {
              if (!exclusions.some(excl => excl.id === member.id)) {
                setExclusions([...exclusions, member]);
              }
            }}
            onInclude={(id: number) => {
              // Remove from exclusions
              removeExclusion(id);
            }}
            selections={selections}
            exclusions={exclusions}
            conditions={conditions}
            onCountsChange={(counts) => setTabCounts(counts)}
            toggleOptions={{ excludeExternal: toggleOptions.excludeExternal }}
          />
        </div>
      </div>
    </div>
  );
};

// Component for selected items (person, group, etc.)
interface SelectedItemProps {
  type: 'person' | 'position' | 'department';
  name: string;
  description: string;
  onRemove: () => void;
}

const SelectedItem: React.FC<SelectedItemProps> = ({ type, name, description, onRemove }) => {
  // Get the appropriate icon based on type
  const getIcon = () => {
    if (type === 'person') {
      // Find the person in peopleData to get their avatar
      const person = peopleData.find(p => p.type === 'person' && p.name === name);
      if (person?.avatar) {
        return (
          <img 
            src={person.avatar} 
            alt={name}
            className="w-8 h-8 rounded-full object-cover"
          />
        );
      }
      return (
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800">
          <span>{name.split(' ').map(n => n[0]).join('')}</span>
        </div>
      );
    } else if (type === 'position') {
      return (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="bg-[#F7F7FA] rounded-xl flex items-center p-3">
      {getIcon()}
      <div className="ml-3 flex-grow">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <button 
        className="text-gray-400 hover:text-gray-500"
        onClick={onRemove}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

// Component for condition row
interface ConditionRowProps {
  condition: Condition;
  options: {
    departments: string[];
    workplaces: string[];
  };
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
  selections: Array<{
    id: number;
    type: string;
    name: string;
    description: string;
  }>;
  onAddSelection: (item: {
    id: number;
    type: string;
    name: string;
    description: string;
  }) => void;
}

const ConditionRow: React.FC<ConditionRowProps> = ({ 
  condition, 
  options, 
  onUpdate, 
  onRemove,
  selections,
  onAddSelection
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Get options based on field
  const getFieldOptions = () => {
    if (condition.field === 'Department') {
      return options.departments.filter(dep => !condition.values?.includes(dep));
    } else if (condition.field === 'Workplace') {
      return options.workplaces.filter(wp => !condition.values?.includes(wp));
    }
    return [];
  };

  // Remove a specific value from multi-select
  const removeValue = (value: string) => {
    if (condition.values) {
      const newValues = condition.values.filter(v => v !== value);
      onUpdate('values', newValues);
    }
  };

  // Add a new value to multi-select
  const addValue = (value: string) => {
    const currentValues = condition.values || [];
    if (!currentValues.includes(value)) {
      onUpdate('values', [...currentValues, value]);
    }
  };

  // Check if field uses multi-select
  const isMultiSelect = condition.field === 'Department' || condition.field === 'Workplace';

  // Handle field change
  const handleFieldChange = (newField: string) => {
    onUpdate('field', newField);
  };

  return (
    <div className="flex items-center">
      <div className="w-1/3">
        <div className="relative">
          <select 
            className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg appearance-none bg-white h-[42px]"
            value={condition.field}
            onChange={(e) => handleFieldChange(e.target.value)}
          >
            <option>Department</option>
            <option>Workplace</option>
            <option>Status</option>
            <option>Title</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="w-1/5 mx-2">
        <div className="relative">
          <select 
            className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg appearance-none bg-white h-[42px]"
            value={condition.operator}
            onChange={(e) => onUpdate('operator', e.target.value)}
          >
            <option>is</option>
            <option>is not</option>
            {!isMultiSelect && <option>contains</option>}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        {isMultiSelect ? (
          <div className="relative flex-1">
            <div 
              className="flex flex-wrap items-center border border-gray-300 rounded-lg p-0.5 pl-2 bg-white min-h-[42px] cursor-pointer"
              onClick={() => setIsFocused(true)}
            >
              {condition.values?.map((val, index) => (
                <div key={index} className="flex items-center bg-gray-100 rounded-md m-0.5">
                  <span className="px-1.5 py-0.5 text-sm">{val}</span>
                  <button 
                    className="text-gray-400 hover:text-gray-500 p-0.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeValue(val);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              <div className="px-2 py-1 text-sm text-gray-500">
                {!condition.values?.length ? `Select ${condition.field.toLowerCase()}...` : ''}
              </div>
            </div>
            {isFocused && (
              <div 
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[200px] overflow-y-auto"
                onMouseDown={(e) => e.preventDefault()}
              >
                {getFieldOptions().map(opt => (
                  <div
                    key={opt}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      addValue(opt);
                      setIsFocused(false);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <select 
            className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg appearance-none bg-white h-[42px]"
            value={condition.value || ''}
            onChange={(e) => {
              if (e.target.value) {
                onUpdate('value', e.target.value);
              }
            }}
          >
            <option value="">Select a value</option>
            {getFieldOptions().map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )}
      </div>
      
      <button 
        className="ml-2 text-gray-400 hover:text-gray-500"
        onClick={onRemove}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

// Component for toggle options
interface ToggleOptionProps {
  label: string;
  value?: string;
  active: boolean;
  options?: string[];
  onToggle: (value: boolean) => void;
  onValueChange?: (value: string) => void;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ 
  label, 
  value, 
  active, 
  options,
  onToggle,
  onValueChange 
}) => {
  return (
    <div className="flex items-center">
      <label className="inline-flex items-center cursor-pointer">
        <span className="relative">
          <span 
            className={`block w-10 h-6 ${active ? 'bg-purple-700' : 'bg-gray-300'} rounded-full transition-colors duration-200 ease-in-out`}
            onClick={() => onToggle(!active)}
          >
            <span className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${active ? 'transform translate-x-4' : ''}`} />
          </span>
        </span>
        <span className="ml-3 text-sm text-gray-700">{label}</span>
      </label>
      {value && options && onValueChange && (
        <div className="relative ml-2">
          <select 
            className="block pl-3 pr-8 py-1 text-sm border border-gray-300 rounded-md appearance-none bg-white"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            disabled={!active}
          >
            {options.map(option => (
              <option key={option} value={option}>
                {option}{label.includes('hire date') ? ' months' : ''}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

// Component for excluded items
interface ExcludedItemProps {
  item: {
    id: number;
    type: string;
    name: string;
    description: string;
    avatar?: string;
  };
  onRemove: (id: number) => void;
}

const ExcludedItem: React.FC<ExcludedItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
      <div className="flex items-center">
        {item.avatar ? (
          <img 
            src={item.avatar} 
            alt={item.name} 
            className="w-8 h-8 rounded-full mr-2"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            {item.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div>
          <div className="text-sm font-medium">{item.name}</div>
          <div className="text-xs text-gray-500">{item.description}</div>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-gray-400 hover:text-gray-500"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default PeopleSelectorContent; 