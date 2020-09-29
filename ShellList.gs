// Credits to Lookas The L for the encrypt / decrypt method
// I had to edit it tho because it was a little bit broken catJAM

// It is important to change this key's value to whatever you want
key = "CHANGE THIS"

// -----------------------------------

Encrypt = function(string, key)

    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345677890!@#$%?&*()_+:. ".values
    alphabet2 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345677890!@#$%?&*()_+:. ".values

    encrypttext = ""
    keylist = key.values
    stringlist = string.values

    for keyind in keylist
        index = alphabet2.indexOf(keyind)
        if index != null then
            alphabet2.remove(index)
        end if
    end for

    alphabet2 = keylist + alphabet2

    for stringind in stringlist
        encrypttext = encrypttext + alphabet2[alphabet.indexOf(stringind)]
    end for

    return encrypttext

end function

Decrypt = function(string, key)

    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345677890!@#$%?&*()_+. ".values
    alphabet2 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345677890!@#$%?&*()_+. ".values

    decrypttext = ""
    keylist = key.values
    stringlist = string.values

    for keyind in keylist
        index = alphabet2.indexOf(keyind)
        if index != null then
            alphabet2.remove(index)
        end if
    end for

    alphabet2 = keylist + alphabet2

    for stringind in stringlist
        decrypttext = decrypttext + alphabet[alphabet2.indexOf(stringind)]
    end for

    return decrypttext

end function

// -----------------------------------

CheckServersFile = function()

    if get_shell.host_computer.File(home_dir + "/BerthServerList") == null then
        get_shell.host_computer.touch(home_dir, "BerthServerList")
    end if

end function

GetServersFile = function()
    return get_shell.host_computer.File(home_dir + "/BerthServerList")
end function

// -----------------------------------

MainMenu = function()

    CheckServersFile()

    clear_screen()
    print("\n     ____            _   _     \n    |  _ \          | | | |    \n    | |_) | ___ _ __| |_| |__  \n    |  _ < / _ \ '__| __| '_ \ \n    | |_) |  __/ |  | |_| | | |\n    |____/ \___|_|   \__|_| |_|")
    print("\nDiscord : https://discord.ggzhp98YT")

    print("<b>[1]</b> Servers list")
    print("<b>[2]</b> Register a new server")
    print("<b>[3]</b> Exit")

    choice = user_input("Choice : ")

    if choice == "1" then
        ListServers()
    else if choice == "2" then
        RegisterNewServer()
    else if choice == "3" then
        exit("Have a good day... sike")
    else
        MainMenu()
    end if

end function

// -----------------------------------

ListServers = function()

    clear_screen()

    servers = GetServersFile.content.split("\n")

    if servers.len > 0 and servers[0].len > 0 then
        for i in range(0, servers.len - 1)
            server_info = servers[i].split(":")

            server_name = Decrypt(server_info[0], key)
            print("<b>[" + (i + 1) + "]</b> " + server_name)
        end for

        print("<b>[" + (servers.len + 1) + "]</b> Main Menu")
    else
        print("No servers registered")
        wait(3)
        MainMenu()
        return
    end if

    choice = user_input("Choice : ").to_int

    if choice > 0 and choice <= servers.len then

        clear_screen()
        print("<size=19>" + Decrypt(servers[choice - 1].split(":")[0], key) + "</size>")

        print("<b>[1]</b> Connect to server")
        print("<b>[2]</b> Delete server from list")

        choice2 = user_input("Choice : ")

        if choice2 == 1 then
            print("connecting")
            ip = Decrypt(server_info[1], key).split(" ").join(".")
            port = Decrypt(server_info[2], key).to_int
            service = Decrypt(server_info[3], key)
            user = Decrypt(server_info[4], key)
            password = Decrypt(server_info[5], key)

            print(ip + " | " + port  + " | " + user + " | " + password + " | " + service)

            get_shell.connect_service(ip, port, user, password, service).start_terminal
        else if choice2 == 2 then
            file_new_content = GetServersFile.content.split("\n").remove(choice - 1)
            if file_new_content != null then
                file_new_content = file_new_content.join("\n")
                GetServersFile.set_content(file_new_content)
            else
                GetServersFile.set_content("")
            end if
            MainMenu()
            return
        else
            ListServers()
        end if

        ip = Decrypt(server_info[1], key)
        port = Decrypt(server_info[2], key).to_int
        service = Decrypt(server_info[3], key)
        user = Decrypt(server_info[4], key)
        password = Decrypt(server_info[5], key)
        get_shell.connect_service(ip, port, user, password, service).start_terminal
    else if choice == servers.len + 1 then
        MainMenu()
    else
        ListServers()
    end if

end function

RegisterNewServer = function()

    name = Encrypt(user_input("Server's name : "), key)
    ip = Encrypt(user_input("Server's ip : "), key)
    port = Encrypt(user_input("Server's port : "), key)
    service = Encrypt(user_input("Server's service (ssh/ftp) : "), key)
    user = Encrypt(user_input("Server's user : "), key)
    password = Encrypt(user_input("Server's : password : ", true), key)

    if GetServersFile.content.split("\n")[0].len == 0 then
        GetServersFile.set_content(name + ":" + ip + ":" + port + ":" + service + ":" + user + ":" + password)
    else
        GetServersFile.set_content("\n" + name + ":" + ip + ":" + port + ":" + service + ":" + user + ":" + password)
    end if

    MainMenu()

end function

// -----------------------------------

MainMenu()

// name:ip:port:service:user:password
//  0   1   2      3     4      5
