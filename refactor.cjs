const fs = require('fs');
const path = require('path');

const filepath = "components/UseCasesGrid.tsx";
const outdir = "components/use-cases";

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
    ["BandhShield", "\\{\\/\\* Use Case 6: The 'Bandh' Shield \\*\\/\\}", "\\{\\/\\* Compact Use Cases Grid \\*\\/\\}"]
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
`;

let topImports = [];

for (let i = 0; i < cases.length; i++) {
    const [name, start_re, end_re] = cases[i];
    const matchStart = new RegExp(start_re).exec(content);
    const matchEnd = new RegExp(end_re).exec(content);
    
    if (matchStart && matchEnd) {
        let block = content.substring(matchStart.index, matchEnd.index).trim();
        block = block.replace(/expandedSlides\[\d+\]/g, 'slide');
        
        const componentCode = `${imports}\nexport const UseCase${name}: React.FC<UseCaseProps> = ({ slide }) => {\n  return (\n    ${block}\n  );\n};\n`;
        
        fs.writeFileSync(path.join(outdir, `UseCase${name}.tsx`), componentCode, 'utf8');
        topImports.push(`import { UseCase${name} } from './use-cases/UseCase${name}';`);
    } else {
        console.log("Could not find", name);
    }
}

const firstMatch = new RegExp(cases[0][1]).exec(content);
const lastMatch = new RegExp(cases[cases.length - 1][2]).exec(content);

if (firstMatch && lastMatch) {
    const startCut = firstMatch.index;
    const endCut = lastMatch.index;
    
    const componentsRender = `
          <UseCaseMorningRush slide={expandedSlides[0]} />
          <UseCaseRainyDay slide={expandedSlides[1]} />
          <UseCaseBiryaniIndex slide={expandedSlides[2]} />
          <UseCaseVendorNegotiation slide={expandedSlides[3]} />
          <UseCaseLanguageBridge slide={expandedSlides[4]} />
          <UseCaseBandhShield slide={expandedSlides[5]} />
          
          `;
          
    let newContent = content.substring(0, startCut) + componentsRender + content.substring(endCut);
    
    const insertPos = newContent.indexOf("const slides = [");
    newContent = newContent.substring(0, insertPos) + topImports.join('\n') + '\n\n' + newContent.substring(insertPos);
    
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log("Success! Refactored " + filepath);
} else {
    console.log("Could not find cut boundaries");
}
