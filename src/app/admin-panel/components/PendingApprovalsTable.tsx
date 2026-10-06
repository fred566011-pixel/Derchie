'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type RequestStatus = 'pending' | 'approved' | 'rejected';

interface ApprovalRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'teacher';
  classOrSubject: string;
  registeredOn: string;
  status: RequestStatus;
}

const initialRequests: ApprovalRequest[] = [
  { id: 'req-001', name: 'Maame Serwaa Appiah', email: 'maame.appiah@gmail.com', phone: '0244876543', role: 'student', classOrSubject: 'JHS 1A', registeredOn: '05 Oct 2026', status: 'pending' },
  { id: 'req-002', name: 'Kwabena Osei-Bonsu', email: 'kwabena.osei@yahoo.com', phone: '0551765432', role: 'student', classOrSubject: 'JHS 2B', registeredOn: '05 Oct 2026', status: 'pending' },
  { id: 'req-003', name: 'Adjoa Nyarko', email: 'adjoa.nyarko@gmail.com', phone: '0241654321', role: 'student', classOrSubject: 'JHS 3A', registeredOn: '04 Oct 2026', status: 'pending' },
  { id: 'req-004', name: 'Fiifi Antwi', email: 'fiifi.antwi@outlook.com', phone: '0209543210', role: 'student', classOrSubject: 'SHS 1', registeredOn: '04 Oct 2026', status: 'pending' },
  { id: 'req-005', name: 'Dr. Akua Sarpong', email: 'akua.sarpong@gmail.com', phone: '0271432109', role: 'teacher', classOrSubject: 'Physics & Chemistry', registeredOn: '03 Oct 2026', status: 'pending' },
  { id: 'req-006', name: 'Mr. Kweku Asante', email: 'kweku.asante@yahoo.com', phone: '0244321098', role: 'teacher', classOrSubject: 'History & Social Studies', registeredOn: '03 Oct 2026', status: 'pending' },
  { id: 'req-007', name: 'Ms. Esi Darko', email: 'esi.darko@gmail.com', phone: '0551210987', role: 'teacher', classOrSubject: 'R.M.E & Creative Arts', registeredOn: '02 Oct 2026', status: 'pending' },
];

type FilterTab = 'all' | 'student' | 'teacher';

export default function PendingApprovalsTable() {
  const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests);
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    id: string | 'bulk';
    action: 'approve' | 'reject';
    name?: string;
    count?: number;
  } | null>(null);
  const [search, setSearch] = useState('');

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const filteredRequests = pendingRequests.filter((r) => {
    const matchesTab = filterTab === 'all' || r.role === filterTab;
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.classOrSubject.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const processedRequests = requests.filter((r) => r.status !== 'pending');

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredRequests.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRequests.map((r) => r.id)));
    }
  };

  const executeAction = async (
    ids: string[],
    action: 'approve' | 'reject'
  ) => {
    setConfirmModal(null);
    for (const id of ids) {
      setProcessingId(id);
      // Backend integration point: PATCH /api/admin/approvals/:id { status: action }
      await new Promise((r) => setTimeout(r, 400));
    }
    setProcessingId(null);
    setRequests((prev) =>
      prev.map((r) =>
        ids.includes(r.id) ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' } : r
      )
    );
    setSelectedIds(new Set());
  };

  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: `All Pending (${pendingRequests.length})` },
    { id: 'student', label: `Students (${pendingRequests.filter((r) => r.role === 'student').length})` },
    { id: 'teacher', label: `Teachers (${pendingRequests.filter((r) => r.role === 'teacher').length})` },
  ];

  return (
    <div>
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="font-bold text-foreground text-base">Pending Registration Approvals</h2>
          <p className="text-muted-foreground text-xs mt-0.5">
            Review and approve or reject new student and teacher registrations.
          </p>
        </div>
        <div className="relative">
          <Icon
            name="MagnifyingGlassIcon"
            size={16}
            variant="outline"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search by name, email, class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-72"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl mb-5 w-fit">
        {filterTabs.map((tab) => (
          <button
            key={`filter-tab-${tab.id}`}
            onClick={() => setFilterTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
              filterTab === tab.id
                ? 'bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-primary text-white rounded-xl px-4 py-3 flex items-center justify-between mb-4 slide-up">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-gold" />
            <span className="text-sm font-semibold">
              {selectedIds.size} request{selectedIds.size > 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setConfirmModal({
                  id: 'bulk',
                  action: 'approve',
                  count: selectedIds.size,
                })
              }
              className="flex items-center gap-1.5 bg-success text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors active:scale-95"
            >
              <Icon name="CheckIcon" size={14} variant="solid" />
              Approve All
            </button>
            <button
              onClick={() =>
                setConfirmModal({
                  id: 'bulk',
                  action: 'reject',
                  count: selectedIds.size,
                })
              }
              className="flex items-center gap-1.5 bg-danger text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors active:scale-95"
            >
              <Icon name="XMarkIcon" size={14} variant="solid" />
              Reject All
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="p-1.5 text-white/60 hover:text-white transition-colors"
            >
              <Icon name="XMarkIcon" size={16} variant="outline" />
            </button>
          </div>
        </div>
      )}

      {/* Pending Table */}
      {filteredRequests.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckBadgeIcon" size={28} variant="solid" className="text-success" />
          </div>
          <h3 className="font-bold text-foreground mb-1">
            {search ? 'No results found' : 'All caught up!'}
          </h3>
          <p className="text-muted-foreground text-sm">
            {search
              ? 'Try adjusting your search query.' :'No pending approval requests at this time.'}
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={
                        filteredRequests.length > 0 &&
                        selectedIds.size === filteredRequests.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded border-input cursor-pointer"
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Applicant
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Class / Subject
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Phone
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Registered
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRequests.map((req) => {
                  const isProcessing = processingId === req.id;
                  const isSelected = selectedIds.has(req.id);

                  return (
                    <tr
                      key={req.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(req.id)}
                          className="rounded border-input cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                            {req.name
                              .split(' ')
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground text-sm">{req.name}</div>
                            <div className="text-muted-foreground text-xs">{req.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                            req.role === 'teacher' ?'bg-gold/10 text-gold border border-gold/20' :'bg-light-blue text-primary border border-primary/10'
                          }`}
                        >
                          <Icon
                            name={req.role === 'teacher' ? 'AcademicCapIcon' : 'UserIcon'}
                            size={11}
                            variant="solid"
                          />
                          {req.role === 'teacher' ? 'Teacher' : 'Student'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">
                        {req.classOrSubject}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">
                        {req.phone}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {req.registeredOn}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {isProcessing ? (
                            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                              <Icon
                                name="ArrowPathIcon"
                                size={14}
                                variant="outline"
                                className="animate-spin"
                              />
                              Processing...
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  setConfirmModal({
                                    id: req.id,
                                    action: 'approve',
                                    name: req.name,
                                  })
                                }
                                className="flex items-center gap-1 px-3 py-1.5 bg-success/10 text-success border border-success/20 rounded-lg text-xs font-semibold hover:bg-success/15 transition-colors active:scale-95"
                              >
                                <Icon name="CheckIcon" size={13} variant="solid" />
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  setConfirmModal({
                                    id: req.id,
                                    action: 'reject',
                                    name: req.name,
                                  })
                                }
                                className="flex items-center gap-1 px-3 py-1.5 bg-danger/10 text-danger border border-danger/20 rounded-lg text-xs font-semibold hover:bg-danger/15 transition-colors active:scale-95"
                              >
                                <Icon name="XMarkIcon" size={13} variant="solid" />
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recently Processed */}
      {processedRequests.length > 0 && (
        <div>
          <h3 className="font-bold text-foreground text-sm mb-3">
            Recently Processed ({processedRequests.length})
          </h3>
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Applicant
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Role
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Class / Subject
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Decision
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {processedRequests.map((req) => (
                    <tr key={`proc-${req.id}`} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs font-bold flex-shrink-0">
                            {req.name
                              .split(' ')
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div>
                            <div className="font-medium text-foreground text-sm">{req.name}</div>
                            <div className="text-muted-foreground text-xs">{req.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            req.role === 'teacher' ?'bg-gold/10 text-gold' :'bg-light-blue text-primary'
                          }`}
                        >
                          {req.role === 'teacher' ? 'Teacher' : 'Student'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {req.classOrSubject}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                            req.status === 'approved' ? 'status-approved' : 'status-rejected'
                          }`}
                        >
                          <Icon
                            name={req.status === 'approved' ? 'CheckCircleIcon' : 'XCircleIcon'}
                            size={12}
                            variant="solid"
                          />
                          {req.status === 'approved' ? 'Approved' : 'Rejected'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-card-lg w-full max-w-sm fade-in p-6">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
                confirmModal.action === 'approve' ? 'bg-success/10' : 'bg-danger/10'
              }`}
            >
              <Icon
                name={confirmModal.action === 'approve' ? 'CheckCircleIcon' : 'XCircleIcon'}
                size={28}
                variant="solid"
                className={confirmModal.action === 'approve' ? 'text-success' : 'text-danger'}
              />
            </div>
            <h3 className="font-bold text-foreground text-center text-base mb-2">
              {confirmModal.action === 'approve' ? 'Approve' : 'Reject'}{' '}
              {confirmModal.id === 'bulk'
                ? `${confirmModal.count} Requests`
                : 'Registration'}
            </h3>
            <p className="text-muted-foreground text-sm text-center mb-6">
              {confirmModal.id === 'bulk'
                ? `Are you sure you want to ${confirmModal.action} ${confirmModal.count} selected request${
                    (confirmModal.count ?? 0) > 1 ? 's' : ''
                  }? This action cannot be undone.`
                : `Are you sure you want to ${confirmModal.action} the registration for ${confirmModal.name}? This action cannot be undone.`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const ids =
                    confirmModal.id === 'bulk'
                      ? Array.from(selectedIds)
                      : [confirmModal.id];
                  executeAction(ids, confirmModal.action);
                }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors active:scale-95 ${
                  confirmModal.action === 'approve' ?'bg-success hover:bg-green-700' :'bg-danger hover:bg-red-700'
                }`}
              >
                {confirmModal.action === 'approve' ? 'Yes, Approve' : 'Yes, Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}