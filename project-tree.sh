echo (
    tree -a -L 15 -I "node_modules|.git|.next|dist|build|coverage" > project-tree.txt
)