#short python script that generates new components correctly to fit the file struct of this project
import os

def main():
    name = input("Enter new component name: ")
    try:
        file = open(os.getcwd().removesuffix("\scripts") + f"\src\components\{name}.jsx", 'w')
        file.write(f"import '../stylesheets/{name}.css';")
        file.close()
        open(os.getcwd().removesuffix("\scripts") + f"\src\stylesheets\{name}.css", 'x')
    except Exception:
        print("Failed to create new files")

    print("Files created")

if __name__ == "__main__":
    main()