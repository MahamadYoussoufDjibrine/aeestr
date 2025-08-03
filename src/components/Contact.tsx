import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('common.error'),
        description: t('contact.form.fill_required_fields'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message
        }]);

      if (dbError) {
        throw dbError;
      }

      // Send notification email
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (emailError) {
        console.warn('Email notification failed:', emailError);
        // Don't throw error - form submission still succeeded
      }

      toast({
        title: t('contact.success'),
        description: t('contact.response_soon'),
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
      
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: t('common.error'),
        description: t('contact.error'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-hero mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-black font-bold max-w-4xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-in-left">
            <h3 className="text-2xl font-bold mb-8 text-foreground">{t('contact.info.reach_out')}</h3>
            
            <div className="space-y-6">
              <Card className="p-6 shadow-card hover:shadow-hero transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('contact.info.email')}</h4>
                    <p className="text-black font-semibold">aeestr235@gmail.com</p>
                    <p className="text-black font-semibold">contact@aeestr.org</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card hover:shadow-hero transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('contact.info.phone')}</h4>
                    <p className="text-black font-semibold">+250790134730</p>
                    <p className="text-sm text-black font-semibold">{t('contact.info.available_247')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card hover:shadow-hero transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('contact.info.address')}</h4>
                    <p className="text-black font-semibold">Kigali, Rwanda</p>
                    <p className="text-sm text-black font-semibold">{t('contact.info.address_on_request')}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8 bg-gradient-card p-6 rounded-2xl">
              <h4 className="font-semibold text-foreground mb-3">{t('contact.info.availability')}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-black font-semibold">{t('contact.info.every_day')}</span>
                  <span className="text-foreground font-bold">{t('contact.info.247')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <Card className="p-8 shadow-card">
              <h3 className="text-2xl font-bold mb-6 text-foreground">{t('contact.form.send_message')}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.name_placeholder')}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.email_placeholder')}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.message_placeholder')}
                    rows={6}
                    className="w-full resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-hero hover:opacity-90 transition-opacity shadow-soft"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-aeestr-blue-light rounded-lg">
                <p className="text-sm text-black font-semibold text-center">
                  {t('contact.form.required_fields_note')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;