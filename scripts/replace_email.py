import os

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('contact@boundaryfirst.com', 'nsc319@gmail.com')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    directory = r"h:\Boundary First Institute\Webpage\src"
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.json', '.js', '.jsx')):
                replace_in_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
