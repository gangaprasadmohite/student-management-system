import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from "@/data/students";
import { SUBJECTS } from "@/data/subjects";
import { X, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";

interface StudentProfileProps {
  student: Student;
  onClose: () => void;
  onEdit: () => void;
}

export function StudentProfile({ student, onClose, onEdit }: StudentProfileProps) {
  const studentSubjects = SUBJECTS.filter(subject => 
    student.subjectIds.includes(subject.id)
  );

  const totalCredits = studentSubjects.reduce((sum, subject) => sum + subject.credits, 0);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      graduated: "outline"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-glow">
        <CardHeader className="bg-gradient-subtle">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                {student.firstName} {student.lastName}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                {getStatusBadge(student.status)}
                <span className="text-sm text-muted-foreground">
                  Student ID: {student.id}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <span>{student.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Date of Birth</span>
                    <div>{new Date(student.dateOfBirth).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Enrollment Date</span>
                    <div>{new Date(student.enrollmentDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Total Credits</span>
                  <div className="text-lg font-semibold text-accent">{totalCredits}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subjects Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enrolled Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              {studentSubjects.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Credits</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentSubjects.map((subject) => (
                      <TableRow key={subject.id}>
                        <TableCell className="font-medium">{subject.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{subject.code}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {subject.description}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {subject.credits}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No subjects enrolled yet.
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}