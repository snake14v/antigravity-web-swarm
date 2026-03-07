import os
import json
import time
from datetime import datetime
import glob
import shutil

MAILBOX_ROOT = ".swarm/mailboxes"
POLL_INTERVAL_MS = 1000

class SwarmMailbox:
    @staticmethod
    def send_message(sender, receiver, subject, body):
        """Dispatches a JSON message to another agent's inbox."""
        if not os.path.exists(f"{MAILBOX_ROOT}/{receiver}/inbox"):
            print(f"[Mailbox] Warning: Agent {receiver} mailbox not found.")
            return False
            
        timestamp = datetime.utcnow().isoformat()
        msg_id = f"msg_{int(time.time() * 1000)}"
        message = {
            "id": msg_id,
            "from": sender,
            "to": receiver,
            "subject": subject,
            "body": body,
            "timestamp": timestamp
        }
        
        filepath = f"{MAILBOX_ROOT}/{receiver}/inbox/{msg_id}.json"
        with open(filepath, 'w') as f:
            json.dump(message, f, indent=2)
            
        print(f"[Mailbox] {sender} -> {receiver}: {subject}")
        return True

    @staticmethod
    def broadcast(sender, subject, body, active_agents):
        """Broadcasts a message to all active agents in the swarm."""
        for agent in active_agents:
            if agent != sender:
                SwarmMailbox.send_message(sender, agent, subject, body)

    @staticmethod
    def poll_inbox(agent_name):
        """Polls the inbox for new JSON messages and archives them safely."""
        inbox_dir = f"{MAILBOX_ROOT}/{agent_name}/inbox"
        processed_dir = f"{MAILBOX_ROOT}/{agent_name}/processed"
        
        if not os.path.exists(inbox_dir):
            return []
            
        inbox_files = glob.glob(f"{inbox_dir}/*.json")
        messages = []
        
        for file in inbox_files:
            try:
                with open(file, 'r') as f:
                    msg = json.load(f)
                    messages.append(msg)
                
                # Archive after reading
                filename = os.path.basename(file)
                shutil.move(file, f"{processed_dir}/{filename}")
            except Exception as e:
                print(f"[Mailbox Error] Failed to read {file}: {e}")
                
        return messages


class ContextEngine:
    """Manus Protocol Operational Hook Implementations"""
    
    @staticmethod
    def pre_tool_use_hook(agent_name, tool_name):
        """Forces the AI to re-read task_plan.md to prevent goal drift."""
        print(f"[{agent_name}] [HOOK: PreToolUse] Executing {tool_name}...")
        try:
            with open("task_plan.md", "r") as f:
                plan = f.read()
            # In a real environment, this gets injected back into the prompt.
            return plan
        except FileNotFoundError:
            return ""

    @staticmethod
    def post_tool_use_hook(agent_name, tool_name):
        """Reminds agent to update progress files."""
        print(f"[{agent_name}] [HOOK: PostToolUse] Finished {tool_name}. Reminder: Update progress.md & findings.md")

    @staticmethod
    def stop_hook(agent_name):
        """Verifies mission checklist phases are marked as complete."""
        print(f"[{agent_name}] [HOOK: Stop] Verifying task_plan.md checklists...")
        try:
            with open("task_plan.md", "r") as f:
                plan = f.read()
            if "- [ ]" in plan:
                print(f"[{agent_name}] WARNING: Unfinished tasks detected in task_plan.md!")
                return False
            return True
        except FileNotFoundError:
            return True


if __name__ == "__main__":
    # Test JSON Mailbox routing 
    print("--- Antigravity Swarm Orchestration Engine ---")
    active_agents = ["Oracle", "Frontend", "Junior", "Quality_Validator"]
    
    SwarmMailbox.send_message("Junior", "Oracle", "Help: PostgreSQL Schema", "I don't understand the users table relations. Please clarify.")
    SwarmMailbox.broadcast("Oracle", "System Update", "Database schema has been updated. Please re-check ORM bindings.", active_agents)
    
    # Simulate UI polling delay
    time.sleep(1)
    
    print("\n[Polling Oracle Inbox]")
    oracle_msgs = SwarmMailbox.poll_inbox("Oracle")
    for m in oracle_msgs:
        print(f"  Got message from {m['from']}: {m['subject']}")
        
    print("\n[Polling Frontend Inbox]")
    frontend_msgs = SwarmMailbox.poll_inbox("Frontend")
    for m in frontend_msgs:
        print(f"  Got message from {m['from']}: {m['subject']}")
        
    print("\n[Testing Context Hooks]")
    ContextEngine.pre_tool_use_hook("Frontend", "generate_react_component")
    ContextEngine.post_tool_use_hook("Frontend", "generate_react_component")
    ContextEngine.stop_hook("Oracle")
