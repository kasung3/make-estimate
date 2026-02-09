'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import {
  Users,
  Plus,
  Loader2,
  Mail,
  Calendar,
  Shield,
  UserMinus,
  UserCog,
  Crown,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface TeamMember {
  id: string;
  userId: string;
  role: 'ADMIN' | 'MEMBER';
  isActive: boolean;
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    firstName: string | null;
    lastName: string | null;
    isBlocked: boolean;
    createdAt: string;
    lastLoginAt: string | null;
  };
}

interface TeamData {
  members: TeamMember[];
  stats: {
    total: number;
    active: number;
    limit: number | null;
  };
  planKey: string | null;
  seatModel: string;
}

export function TeamClient() {
  const { data: session } = useSession() || {};
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: 'MEMBER' as 'ADMIN' | 'MEMBER',
  });
  const [removeMember, setRemoveMember] = useState<TeamMember | null>(null);
  const [removing, setRemoving] = useState(false);
  const [updatingMemberId, setUpdatingMemberId] = useState<string | null>(null);

  const fetchTeamData = useCallback(async () => {
    try {
      const res = await fetch('/api/team');
      if (!res.ok) throw new Error('Failed to fetch team');
      const data = await res.json();
      setTeamData(data);
    } catch (error) {
      console.error('Error fetching team:', error);
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamData();
  }, [fetchTeamData]);

  const handleInvite = async () => {
    if (!inviteForm.email) {
      toast.error('Email is required');
      return;
    }

    setInviting(true);
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inviteForm),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === 'PLAN_NOT_SUPPORTED') {
          toast.error('Upgrade to Business plan to add team members');
        } else if (data.code === 'ALREADY_MEMBER') {
          toast.error('This user is already a team member');
        } else {
          toast.error(data.error || 'Failed to invite member');
        }
        return;
      }

      toast.success('Team member added successfully');
      setShowInviteDialog(false);
      setInviteForm({ email: '', firstName: '', lastName: '', password: '', role: 'MEMBER' });
      fetchTeamData();
    } catch (error) {
      toast.error('Failed to invite member');
    } finally {
      setInviting(false);
    }
  };

  const handleToggleActive = async (member: TeamMember) => {
    setUpdatingMemberId(member.id);
    try {
      const res = await fetch(`/api/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !member.isActive }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Failed to update member');
        return;
      }

      toast.success(member.isActive ? 'Member deactivated' : 'Member activated');
      fetchTeamData();
    } catch (error) {
      toast.error('Failed to update member');
    } finally {
      setUpdatingMemberId(null);
    }
  };

  const handleUpdateRole = async (member: TeamMember, newRole: 'ADMIN' | 'MEMBER') => {
    if (member.role === newRole) return;

    setUpdatingMemberId(member.id);
    try {
      const res = await fetch(`/api/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Failed to update role');
        return;
      }

      toast.success(`Role updated to ${newRole}`);
      fetchTeamData();
    } catch (error) {
      toast.error('Failed to update role');
    } finally {
      setUpdatingMemberId(null);
    }
  };

  const handleRemoveMember = async () => {
    if (!removeMember) return;

    setRemoving(true);
    try {
      const res = await fetch(`/api/team/${removeMember.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Failed to remove member');
        return;
      }

      toast.success('Team member removed');
      setRemoveMember(null);
      fetchTeamData();
    } catch (error) {
      toast.error('Failed to remove member');
    } finally {
      setRemoving(false);
    }
  };

  const isCurrentUser = (member: TeamMember) => member.userId === session?.user?.id;

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Show upgrade message for non-team plans
  if (teamData?.seatModel === 'single') {
    return (
      <div className="p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle>Team Management</CardTitle>
            <CardDescription>
              Team collaboration features are available on the Business plan
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Upgrade to the Business plan to add team members, manage roles, and collaborate
              on BOQs together. Per-seat billing ensures you only pay for active users.
            </p>
            <Button
              onClick={() => window.open('/pricing', '_blank')}
            >
              View Pricing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">
            Manage your team members and their access
          </p>
        </div>
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Invite a new member to join your team. They will receive login credentials.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="colleague@company.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={inviteForm.firstName}
                    onChange={(e) => setInviteForm({ ...inviteForm, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={inviteForm.lastName}
                    onChange={(e) => setInviteForm({ ...inviteForm, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Initial Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={inviteForm.password}
                  onChange={(e) => setInviteForm({ ...inviteForm, password: e.target.value })}
                  placeholder="Leave empty for default"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  If left empty, a temporary password will be generated
                </p>
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={inviteForm.role}
                  onValueChange={(value) => setInviteForm({ ...inviteForm, role: value as 'ADMIN' | 'MEMBER' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MEMBER">Member - Can create and edit BOQs</SelectItem>
                    <SelectItem value="ADMIN">Admin - Full access including team management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={inviting}>
                {inviting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Add Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{teamData?.stats.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Seats</p>
                <p className="text-2xl font-bold">{teamData?.stats.active || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-amber-100">
                <Crown className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="text-2xl font-bold capitalize">{teamData?.planKey || 'None'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per-seat billing notice */}
      {teamData?.seatModel === 'per_seat' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Per-Seat Billing Active</p>
                <p className="text-sm text-blue-700">
                  Your subscription is billed per active team member. Deactivating members will reduce your next invoice.
                  Currently billing for {teamData?.stats.active || 1} seat(s).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage who has access to your company's BOQs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamData?.members.map((member) => (
              <div
                key={member.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border ${
                  !member.isActive ? 'bg-gray-50 opacity-75' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {(member.user.firstName?.[0] || member.user.email[0]).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {member.user.name || member.user.email}
                      </span>
                      {isCurrentUser(member) && (
                        <Badge variant="outline" className="text-xs">You</Badge>
                      )}
                      <Badge variant={member.role === 'ADMIN' ? 'default' : 'secondary'}>
                        {member.role}
                      </Badge>
                      {!member.isActive && (
                        <Badge variant="outline" className="bg-gray-100">Inactive</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {member.user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined {format(new Date(member.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>

                {!isCurrentUser(member) && (
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    {/* Active Toggle */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Active</span>
                      <Switch
                        checked={member.isActive}
                        onCheckedChange={() => handleToggleActive(member)}
                        disabled={updatingMemberId === member.id}
                      />
                    </div>

                    {/* Role Selector */}
                    <Select
                      value={member.role}
                      onValueChange={(value) => handleUpdateRole(member, value as 'ADMIN' | 'MEMBER')}
                      disabled={updatingMemberId === member.id}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MEMBER">Member</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setRemoveMember(member)}
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {teamData?.members.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No team members yet. Click "Add Team Member" to invite someone.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Remove Member Confirmation */}
      <AlertDialog open={!!removeMember} onOpenChange={() => setRemoveMember(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {removeMember?.user.name || removeMember?.user.email} from your team?
              They will lose access to all company BOQs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMember}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={removing}
            >
              {removing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
