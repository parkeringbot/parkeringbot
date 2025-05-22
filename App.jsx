import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, MailCheck } from "lucide-react";

export default function Parkeringbot() {
  const [step, setStep] = useState(1);
  const [ticketImage, setTicketImage] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTicketImage(URL.createObjectURL(file));
      setStep(2);
    }
  };

  const handleSend = () => {
    setEmailSent(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Parkeringbot.no</h1>
      <p className="text-center text-gray-600">Boten din, forklart og utfordret</p>

      {step === 1 && (
        <Card className="p-6 text-center">
          <CardContent className="space-y-4">
            <Upload className="mx-auto w-10 h-10 text-blue-500" />
            <label className="block">
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              <p className="text-sm text-gray-500 mt-2">
                Last opp bilde av boten<br />
                eller skriv inn kontrollseddelnummeret
              </p>
            </label>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">#2 Få forklaringen</h2>
            <p className="text-gray-600">Hva fikk du bot for, egentlig?</p>
          </div>
          <Card className="p-4">
            <CardContent>
              <p>Vi analyserer boten din og forklarer hva den gjelder. Dette kan ta noen sekunder...</p>
            </CardContent>
          </Card>

          <Button onClick={() => setStep(3)} className="w-full">
            Gå videre til klagen
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">#3 Lag klagen</h2>
            <p className="text-gray-600">Vi lager en klage du kan sende</p>
          </div>
          <Card className="p-4">
            <CardContent>
              <p>Basert på informasjonen vi fant, foreslår vi følgende klagebrev:</p>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-sm">
Jeg mener parkeringsboten er feilaktig utstedt. Bilen var korrekt parkert og betalingsløsning ble forsøkt benyttet. Jeg ber om at boten revurderes.
              </pre>
            </CardContent>
          </Card>

          {!emailSent ? (
            <Button onClick={handleSend} className="w-full">Send klage</Button>
          ) : (
            <div className="text-green-600 text-center space-y-2">
              <MailCheck className="mx-auto w-8 h-8" />
              <p>Klagen er sendt! Du vil få svar fra parkeringsselskapet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
