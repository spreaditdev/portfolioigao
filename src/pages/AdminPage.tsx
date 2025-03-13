import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useContact } from "@/hooks/useContact";
import { ContactMessage } from "@/services/contactService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Mail, Trash2, Eye, CheckCircle, Archive } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    loading: contactLoading,
    error,
    getContactMessages,
    updateContactStatus,
    deleteContactMessage,
  } = useContact();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);

    // Mark as read if it's new
    if (message.status === "new") {
      handleUpdateStatus(message.id!, "read");
    }
  };

  const handleUpdateStatus = async (
    id: string,
    status: "new" | "read" | "replied" | "archived",
  ) => {
    try {
      await updateContactStatus(id, status);
      // Update local state
      setMessages(
        messages.map((msg) => (msg.id === id ? { ...msg, status } : msg)),
      );

      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (err) {
      console.error("Error updating message status:", err);
    }
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessage?.id) return;

    try {
      await deleteContactMessage(selectedMessage.id);
      setMessages(messages.filter((msg) => msg.id !== selectedMessage.id));
      setIsDeleteDialogOpen(false);
      setIsDialogOpen(false);
      setSelectedMessage(null);
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">Novo</Badge>;
      case "read":
        return <Badge className="bg-green-500">Lido</Badge>;
      case "replied":
        return <Badge className="bg-purple-500">Respondido</Badge>;
      case "archived":
        return <Badge variant="outline">Arquivado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Painel Administrativo - Mensagens de Contato
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contactLoading ? (
                <div className="text-center py-8">
                  <p>Carregando mensagens...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>Erro ao carregar mensagens: {error.message}</p>
                  <Button
                    onClick={fetchMessages}
                    variant="outline"
                    className="mt-4"
                  >
                    Tentar novamente
                  </Button>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhuma mensagem de contato encontrada.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Assunto</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((message) => (
                        <TableRow
                          key={message.id}
                          className={
                            message.status === "new"
                              ? "font-medium bg-blue-50 dark:bg-blue-900/20"
                              : ""
                          }
                        >
                          <TableCell>
                            {getStatusBadge(message.status || "new")}
                          </TableCell>
                          <TableCell>{message.name}</TableCell>
                          <TableCell>{message.email}</TableCell>
                          <TableCell>{message.subject}</TableCell>
                          <TableCell>
                            {message.createdAt &&
                              format(
                                new Date(message.createdAt),
                                "dd/MM/yyyy HH:mm",
                              )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewMessage(message)}
                                title="Ver mensagem"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedMessage(message);
                                  setIsDeleteDialogOpen(true);
                                }}
                                title="Excluir mensagem"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* View Message Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  De: {selectedMessage.name} ({selectedMessage.email})
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(selectedMessage.status || "new")}
                    <span className="text-sm text-gray-500">
                      {selectedMessage.createdAt &&
                        format(
                          new Date(selectedMessage.createdAt),
                          "dd/MM/yyyy HH:mm",
                        )}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              <DialogFooter className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedMessage.id!, "read")
                    }
                    disabled={selectedMessage.status === "read"}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Marcar como lido
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedMessage.id!, "replied")
                    }
                    disabled={selectedMessage.status === "replied"}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marcar como respondido
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedMessage.id!, "archived")
                    }
                    disabled={selectedMessage.status === "archived"}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Arquivar
                  </Button>
                </div>
                <Button
                  variant="default"
                  onClick={() => {
                    window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Responder por Email
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta mensagem? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteMessage}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminPage;
