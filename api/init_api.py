import platform
import subprocess

os_name = platform.system()

if os_name == "Windows":
    subprocess.run(["python", "-m", "venv", ".venv"])
    subprocess.run([".venv/Scripts/activate"])
    subprocess.run(["pip", "install", "-r", "requirements.txt"])
    subprocess.run(["mkdir", "db"])
    subprocess.run(["touch db/app.db"])
    subprocess.run(["python3", "functions/init_db.py"])
    subprocess.run(["python3", "app.py"])
elif os_name == "Linux":
    subprocess.run(["python3", "-m", "venv", ".venv"])
    subprocess.run(["source", ".venv/bin/activate"])
    subprocess.run(["pip3", "install", "-r", "requirements.txt"])
    subprocess.run(["mkdir", "db"])
    subprocess.run(["touch db/app.db"])
    subprocess.run(["python3", "functions/init_db.py"])
    subprocess.run(["python3", "app.py"])