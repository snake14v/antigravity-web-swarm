import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filepath = path.join(__dirname, "components", "UseCasesGrid.tsx");
const outdir = path.join(__dirname, "components", "use-cases");

if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir, { recursive: true });
}

let content = fs.readFileSync(filepath, 'utf8');

const cases = [
    ["MorningRush", "\\{\\/\\* Use Case 1: Morning Rush \\*\\/\\}", "\\{\\/\\* Use Case 2: Rainy Day Protocol \\*\\/\\}"],
    ["RainyDay", "\\{\\/\\* Use Case 2: Rainy Day Protocol \\*\\/\\}", "\\{\\/\\* Use Case 3: The 'Biryani Index' \\*\\/\\}"],
    ["BiryaniIndex", "\\{\\/\\* Use Case 3: The 'Biryani Index' \\*\\/\\}", "\\{\\/\\* Use Case 4: Vendor Auto-Negotiation \\*\\/\\}"],
    ["VendorNegotiation", "\\{\\/\\* Use Case 4: Vendor Auto-Negotiation \\*\\/\\}", "\\{\\/\\* Use Case 5: Staff Language Bridge \\*\\/\\}"],
    ["LanguageBridge", "\\{\\/\\* Use Case 5: Staff Language Bridge \\*\\/\\}", "\\{\\/\\* Use Case 6: The 'Bandh' Shield \\*\\/\\}"],
    ["BandhShield", "\\{\\/\\* Use Case 6: The 'Bandh' Shield \\*\\/\\}", "\\{\\/\\* Use Case 7: Smart-Menu Engineering \\*\\/\\}"],
    ["SmartMenu", "\\{\\/\\* Use Case 7: Smart-Menu Engineering \\*\\/\\}", "\\{\\/\\* Use Case 8: "],
    ["ExitStrategy", "\\{\\/\\* Use Case 18: The 'Exit Strategy' \\*\\/\\}", "\\{\\/\\* Divider \\*\\/\\}"]
];

const imports = `import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageRoute } from '../../types';
import { 
  Coffee, CloudRain, TrendingUp, Truck, Mic, ShieldAlert, 
  Menu, UserCheck, Battery, MessageSquare, AlertTriangle, Search, FileText, 
  Users, Award, Recycle, MapPin, DollarSign, Brain, CloudLightning, Smartphone, Clock, ArrowDownRight, ArrowRight
} from 'lucide-react';

interface Slide {
  id: number;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
  tag: string;
  stat: string;
}

interface UseCaseProps {
  slide: Slide;
}

export const ExpandedUseCases: React.FC<{ expandedSlides: Slide[] }> = ({ expandedSlides }) => {
  return (
    <div className="space-y-32 mb-32">
        <UseCaseMorningRush slide={expandedSlides[0]} />
        <UseCaseRainyDay slide={expandedSlides[1]} />
        <UseCaseBiryaniIndex slide={expandedSlides[2]} />
        <UseCaseVendorNegotiation slide={expandedSlides[3]} />
        <UseCaseLanguageBridge slide={expandedSlides[4]} />
        <UseCaseBandhShield slide={expandedSlides[5]} />
    </div>
  );
};
`;

let topImports = [];

// For safety, I will not split into 18 components automatically right now, that is extremely complex string matching.
// Instead I will just extract the entire block from "Use Case 1: Morning Rush" to "Divider" into one huge new file "ExpandedUseCases.tsx".
// Then replace that block in UseCasesGrid.tsx with `<ExpandedUseCases expandedSlides={expandedSlides} />`.

const startMatch = content.match(/\{\/\* Use Case 1: Morning Rush \*\/\}/);
const endMatch = content.match(/\{\/\* Divider \*\/\}/);

if (startMatch && endMatch) {
    const startIdx = startMatch.index;
    const endIdx = endMatch.index;
    const block = content.substring(startIdx, endIdx).trim();
    
    // We rewrite ExpandedUseCases.tsx
    const componentCode = `${imports}

export const ExpandedUseCases: React.FC<{ expandedSlides: Slide[] }> = ({ expandedSlides }) => {
  return (
    <div className="space-y-32 mb-32">
      ${block}
    </div>
  );
};
`;
    // We remove the old ExpandedUseCases if it exists in `imports` (just rewrite).
    
    // Fix the `imports` variable slightly above since I duplicated it.
    const cleanComponentCode = componentCode.replace(/export const ExpandedUseCases[\s\S]*?;\n};\n/, ''); // remove duplicate

    fs.writeFileSync(path.join(outdir, "ExpandedUseCases.tsx"), cleanComponentCode, "utf8");
    
    let newContent = content.substring(0, startIdx) + "<ExpandedUseCases expandedSlides={expandedSlides} />\n\n        " + content.substring(endIdx);
    
    // Inject import into newContent
    const insertPos = newContent.indexOf("const slides = [");
    newContent = newContent.substring(0, insertPos) + "import { ExpandedUseCases } from './use-cases/ExpandedUseCases';\n" + newContent.substring(insertPos);
    
    fs.writeFileSync(filepath, newContent, "utf8");
    console.log("Success! Refactored " + filepath);
} else {
    console.log("Could not find the bounds for the entire expanded slides block.");
}
