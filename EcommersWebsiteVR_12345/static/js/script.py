import tkinter as tk

class Application(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.master = master
        self.pack()
        self.create_widgets()

    def create_widgets(self):
        self.bar = tk.Button(self)
        self.bar["text"] = "Bar"
        self.bar["command"] = self.activate_navbar
        self.bar.pack(side="top")

        self.close = tk.Button(self)
        self.close["text"] = "Close"
        self.close["command"] = self.deactivate_navbar
        self.close.pack(side="top")

        self.navbar = tk.Frame(self)
        self.navbar.pack(side="top")

        self.navbar_active = False

    def activate_navbar(self):
        if not self.navbar_active:
            self.navbar.pack(side="top")
            self.navbar_active = True

    def deactivate_navbar(self):
        if self.navbar_active:
            self.navbar.pack_forget()
            self.navbar_active = False

root = tk.Tk()
app = Application(master=root)
app.mainloop()