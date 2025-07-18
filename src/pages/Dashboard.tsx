import { useState } from 'react';
import { StudentTable } from '@/components/StudentTable';
import { StudentForm } from '@/components/StudentForm';
import { StudentProfile } from '@/components/StudentProfile';
import { Student, INITIAL_STUDENTS } from '@/data/students';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { toast } = useToast();

  const generateId = () => {
    return (Math.max(...students.map((s) => parseInt(s.id)), 0) + 1).toString();
  };

  const handleCreateStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowProfile(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    toast({
      title: 'Student deleted',
      description: 'The student has been successfully removed.',
    });
  };

  const handleSaveStudent = (studentData: Omit<Student, 'id'>) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id
            ? { ...studentData, id: editingStudent.id }
            : s
        )
      );
      toast({
        title: 'Student updated',
        description: 'The student information has been successfully updated.',
      });
    } else {
      const newStudent: Student = {
        ...studentData,
        id: generateId(),
      };
      setStudents((prev) => [...prev, newStudent]);
      toast({
        title: 'Student created',
        description: 'A new student has been successfully added.',
      });
    }
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedStudent(null);
  };

  const handleEditFromProfile = () => {
    if (selectedStudent) {
      setEditingStudent(selectedStudent);
      setShowProfile(false);
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Student Management System
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage students and their subject enrollments
          </p>
        </div>

        <StudentTable
          students={students}
          onViewStudent={handleViewStudent}
          onEditStudent={handleEditStudent}
          onDeleteStudent={handleDeleteStudent}
          onCreateStudent={handleCreateStudent}
        />

        {showForm && (
          <StudentForm
            student={editingStudent || undefined}
            onSave={handleSaveStudent}
            onCancel={handleCancelForm}
          />
        )}

        {showProfile && selectedStudent && (
          <StudentProfile
            student={selectedStudent}
            onClose={handleCloseProfile}
            onEdit={handleEditFromProfile}
          />
        )}
      </div>
    </div>
  );
}
