function Note(name, content)
{
    var self = this;
    self.Name = name;
    self.Content = content;
}

var AppViewModel = function () {
    var self = this;
    self.notepads = ko.observableArray([]);
    self.visible = ko.observable(0);
    self.message = ko.observable('');
    self.Name = ko.observable('');
    self.Content = ko.observable('');
    self.currentnotepad = ko.observable(new Note("",""));
    self.selectedNote = ko.observable('');
    self.notepadImage = ko.observable('');
    function Image()
    {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var url = window.URL || window.webkitURL;
                self.notepadImage(url.createObjectURL(this.response));
            }
        }
        var formData = new FormData();
        formData.append('name', selectedNote());
        xhr.open('POST', '/Notepad/Image/', true)
        xhr.responseType = 'blob';
        xhr.send(formData);
    }
    self.addItem = function (data, element)
    {
        if (self.Name() != "") {
            var have = false;
            ko.utils.arrayForEach(self.notepads(), function (v) {
                if (v().Name == self.Name()) {
                    have = true;
                }
            });
            if (!have) {
                self.currentnotepad = ko.observable(new Note(self.Name(), ""));
                var data = ko.toJSON(self.currentnotepad);
                $.post("/Notepad/Save", { note: data }, function (returnedData) {
                    self.notepads.push(self.currentnotepad);
                    $("#notepads").parents().children().removeClass('active');
                    $("#notepads[name='" + self.Name() + "']").addClass('active');
                    selectedNote(self.Name());
                    self.Name("");
                    self.Content("");
                    self.message('<strong>Well done!</strong>You successfully create');
                    self.visible(1);
                    Image();
                })
            }else
            {
                self.Name("");
                self.Content("");
                self.message('<strong>Failed!</strong>This notepad is exist');
                self.visible(2);
                self.notepadImage('');
            }
            //$.ajax({
            //    type: 'POST',
            //    url: '/Home/Save',
            //    data: { note: data },
            //    success: function (returnedData) {
            //        alert(returnedData.message);
            //    }
            //});
            //ko.utils.postJson('Home/Save', {note:data});
        }
    }
    self.saveItem = function ()
    {
        ko.utils.arrayForEach(self.notepads(), function (v) {
            if (v().Name == selectedNote()) {
                v().Content = self.Content();
                self.message('<strong>Well done!</strong>Saved');
                self.visible(1);
            }
        });
    }
    self.removeItem = function ()
    {
        var item;
        ko.utils.arrayForEach(self.notepads(), function (v) {
            if (v().Name == selectedNote())
            {
                item = v;
                self.message('<strong>Well done!</strong>Deleted');
                self.visible(1);
                self.Content('');
            }
        });
        self.notepads.remove(item);
        if (self.notepads().length > 0) {
            console.log(self.notepads().length);
            selectedNote(self.notepads()[self.notepads().length - 1]().Name);
            $("#notepads[name='" + self.selectedNote() + "']").addClass('active');
            self.Name('');
            self.Content(self.notepads()[self.notepads().length - 1]().Content);
            Image();
        }
    }
    self.selectnote = function (data, element, lab) {
        if (lab == null) { var label = $(element.target).text(); }
        else { var label = lab; }
        self.selectedNote(label);
        $(element.target).parent().children().removeClass('active');
        $(element.target).addClass('active');
        var item;
        ko.utils.arrayForEach(self.notepads(), function (v) {
            if (v().Name == label)
            {
                item = v;
                self.message('<strong>Well done!</strong>Selected');
                self.visible(1);
            }
        });
        self.Content(item().Content);
        Image();
    };

}

ko.applyBindings(AppViewModel);

