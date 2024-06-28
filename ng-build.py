import os

print("Initializing Build....")
current_dir = os.getcwd()
dest_path = current_dir + "\\backend\\static\\amigo-app"
os.system(f"cd frontend && npm install && ng build --configuration=production  --aot --output-hashing none --output-path {dest_path}")


