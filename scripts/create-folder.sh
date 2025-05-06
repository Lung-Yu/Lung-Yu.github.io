folder_name=$1

if [ -z "$folder_name" ]; then
    echo "Folder name is required"
    exit 1
fi

mkdir -p src/features/$folder_name/{components,hooks,styles,types,data}