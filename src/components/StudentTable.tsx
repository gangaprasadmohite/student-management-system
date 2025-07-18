import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Student } from '@/data/students';
import { SUBJECTS } from '@/data/subjects';
import { Input } from './ui/input';

interface StudentTableProps {
  students: Student[];
  onViewStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onCreateStudent: () => void;
}

export function StudentTable({
  students,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onCreateStudent,
}: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');

  const getSubjectNames = (subjectIds: string[]) => {
    return subjectIds
      .map((id) => SUBJECTS.find((subject) => subject.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      graduated: 'outline',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase();
    return (
      student.firstName.toLowerCase().includes(search) ||
      student.lastName.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      student.phone.toLowerCase().includes(search) ||
      student.status.toLowerCase().includes(search) ||
      getSubjectNames(student.subjectIds).toLowerCase().includes(search) ||
      new Date(student.enrollmentDate).toLocaleDateString().includes(search)
    );
  });

  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-gradient-subtle">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-xl font-semibold">Students</CardTitle>

          <div className="w-full md:w-1/2 flex gap-2">
            <Input
              placeholder="Search by name, email, phone, status, subjects, enrollment date"
              className="w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={() => setSearchTerm(inputValue)}
              className="bg-gradient-primary shadow-glow"
            >
              Search
            </Button>
          </div>

          <Button
            onClick={onCreateStudent}
            className="bg-gradient-primary shadow-glow"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-muted/50 transition-colors"
                  onDoubleClick={() => onViewStudent(student)}
                >
                  <TableCell className="font-medium">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <span className="text-sm text-muted-foreground truncate block">
                      {getSubjectNames(student.subjectIds)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(student.enrollmentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-card border"
                      >
                        <DropdownMenuItem
                          onClick={() => onViewStudent(student)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEditStudent(student)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteStudent(student.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No students found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
