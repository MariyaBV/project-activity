function main() {
    const user = {
        name: "Вася",
        surname: "Петров"
    };
    console.log(user);

    user.name = "Сергей";
    console.log(user);

    delete user.name; // delete user["name"];
    console.log(user);    
};

main();