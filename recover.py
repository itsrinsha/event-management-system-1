import json
import os

transcript_path = r"C:\Users\rinsh\.gemini\antigravity-ide\brain\1d886beb-de13-49bb-ad1f-b344d6477837\.system_generated\logs\transcript.jsonl"
files_to_recover = [
    r"c:\Users\rinsh\OneDrive\Desktop\django-assesment\frontend\src\components\Button.jsx",
    r"c:\Users\rinsh\OneDrive\Desktop\django-assesment\frontend\src\components\EventCard.jsx",
    r"c:\Users\rinsh\OneDrive\Desktop\django-assesment\frontend\src\components\InputField.jsx",
    r"c:\Users\rinsh\OneDrive\Desktop\django-assesment\frontend\src\index.css",
    r"c:\Users\rinsh\OneDrive\Desktop\django-assesment\frontend\src\pages\EventDetail.jsx",
    r"c:\Users\rinsh\OneDrive\Desktop\django-assesment\frontend\src\pages\EventListing.jsx",
    r"c:\Users\rinsh\OneDrive\Desktop\django-assesment\frontend\src\pages\MyRegistrations.jsx"
]

recovered = {}

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if 'tool_calls' in step:
                for tc in step['tool_calls']:
                    fname = tc.get('function', {}).get('name', '')
                    if 'write_to_file' in fname:
                        args_str = tc.get('function', {}).get('arguments', '{}')
                        try:
                            args = json.loads(args_str)
                            target = args.get('TargetFile', '').lower()
                            # Print to debug
                            print("Found write_to_file for:", target)
                            for f_path in files_to_recover:
                                if f_path.lower() == target:
                                    recovered[f_path] = args.get('CodeContent', '')
                        except:
                            pass
        except Exception as e:
            pass

for path, content in recovered.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Recovered {path} ({len(content)} bytes)")
