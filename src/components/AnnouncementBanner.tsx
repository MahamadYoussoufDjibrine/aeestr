import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminMessage {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  author_email: string;
}

const AnnouncementBanner = () => {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    loadActiveMessages();
    
    // Set up real-time subscription for message updates
    const channel = supabase
      .channel('admin-messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_messages'
        },
        () => {
          loadActiveMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadActiveMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_messages')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setMessages(data || []);
      // Reset to first message when messages update
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  // Don't render if no messages, not visible, or no active messages
  if (!isVisible || messages.length === 0) {
    return null;
  }

  const currentMessage = messages[currentIndex];

  return (
    <div className="bg-gradient-hero text-white py-3">
      <div className="container mx-auto px-4">
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <MessageSquare className="w-5 h-5 text-white" />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{currentMessage.title}</h3>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Announcement
                    </Badge>
                  </div>
                  <p className="text-white/90 text-sm">{currentMessage.content}</p>
                  <span className="text-white/70 text-xs">
                    {new Date(currentMessage.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                {/* Navigation arrows if multiple messages */}
                {messages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePrevious}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <span className="text-white/70 text-sm px-2">
                      {currentIndex + 1} / {messages.length}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNext}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
                
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementBanner;