import re
import os

filepath = "components/UseCasesGrid.tsx"
outdir = "components/use-cases"
os.makedirs(outdir, exist_ok=True)

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Define the boundaries of the use cases we want to extract
cases = [
    ("MorningRush", r"\{\/\* Use Case 1: Morning Rush \*\/\}", r"\{\/\* Use Case 2: Rainy Day Protocol \*\/\}"),
    ("RainyDay", r"\{\/\* Use Case 2: Rainy Day Protocol \*\/\}", r"\{\/\* Use Case 3: The 'Biryani Index' \*\/\}"),
    ("BiryaniIndex", r"\{\/\* Use Case 3: The 'Biryani Index' \*\/\}", r"\{\/\* Use Case 4: Vendor Auto-Negotiation \*\/\}"),
    ("VendorNegotiation", r"\{\/\* Use Case 4: Vendor Auto-Negotiation \*\/\}", r"\{\/\* Use Case 5: Staff Language Bridge \*\/\}"),
    ("LanguageBridge", r"\{\/\* Use Case 5: Staff Language Bridge \*\/\}", r"\{\/\* Use Case 6: The 'Bandh' Shield \*\/\}"),
    ("BandhShield", r"\{\/\* Use Case 6: The 'Bandh' Shield \*\/\}", r"\{\/\* Compact Use Cases Grid \*\/\}")
]

imports = """import React from 'react';
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
"""

components_dict = {}

for name, start_re, end_re in cases:
    # Need to find the blocks.
    match_start = re.search(start_re, content)
    match_end = re.search(end_re, content)
    if match_start and match_end:
        start_idx = match_start.start()
        end_idx = match_end.start()
        
        block = content[start_idx:end_idx].strip()
        
        # We need to replace `expandedSlides[index]` with `slide`
        # Because we'll pass slide as a prop.
        block = re.sub(r'expandedSlides\[\d+\]', 'slide', block)
        
        component_code = f"""{imports}
export const UseCase{name}: React.FC<UseCaseProps> = ({{ slide }}) => {{
  return (
    {block}
  );
}};
"""
        with open(os.path.join(outdir, f"UseCase{name}.tsx"), "w", encoding="utf-8") as f:
            f.write(component_code)
            
        components_dict[name] = block
        
print("Extracted Use Cases.")

# Now replace those chunks in the main file
new_content = content
top_imports = []
replace_str = ""

for name, _, _ in cases:
    top_imports.append(f"import {{ UseCase{name} }} from './use-cases/UseCase{name}';")
    # Instead of deleting, just replacing the giant block in new_content
    # The `cases` specify start and end bounds exactly. This is tricky due to re substitutions.

# To be safe, just replace the entire Expanded Top 3 Use Cases / 6 bounds.
match_first_case = re.search(cases[0][1], new_content)
match_last_bound = re.search(cases[-1][2], new_content)

if match_first_case and match_last_bound:
    start_cut = match_first_case.start()
    end_cut = match_last_bound.start()
    
    components_render = """
          <UseCaseMorningRush slide={expandedSlides[0]} />
          <UseCaseRainyDay slide={expandedSlides[1]} />
          <UseCaseBiryaniIndex slide={expandedSlides[2]} />
          <UseCaseVendorNegotiation slide={expandedSlides[3]} />
          <UseCaseLanguageBridge slide={expandedSlides[4]} />
          <UseCaseBandhShield slide={expandedSlides[5]} />
          
          """
          
    latest_content = new_content[:start_cut] + components_render + new_content[end_cut:]
    
    # insert imports at top (after typical imports)
    insert_pos = latest_content.find("const slides = [")
    latest_content = latest_content[:insert_pos] + "\n".join(top_imports) + "\n\n" + latest_content[insert_pos:]
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(latest_content)
        
    print("Replaced main file content successfully. Size went from len", len(content), "to", len(latest_content))
else:
    print("Could not find boundaries for cut.")
