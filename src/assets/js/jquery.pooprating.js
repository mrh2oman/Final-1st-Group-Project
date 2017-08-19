// Made with love :)  Make sure that simple CSS classes are included.
$.fn.poopRating = function (totalPoops, poopVal, clickCallback) {
    // check to see if we have multiple jQuery objects that matched such as if we had a class selector passed
    if (this.length > 1) {
        // loop through all the jQuery elements and create a nice unique dump for each otherwise logic frays...
        // may be a better way to handle with jQuery plugins, but I do not have time and this works.
        for (var i = 0; i < totalPoops; i++) {
            // call ourself passing unique element
            $(this[i]).poopRating(totalPoops, poopVal, clickCallback);
        }
        // kick out of the jQuery function to prevent global apply to css selectors
        return null;
    }

    // internal variables
    var self = this;

    // hold on to our container
    this.poopContainer = $(this);
    // array to hold all the poops
    this.poops = [];
    // currently selected turd
    this.selectedPoopValue = poopVal;

    // check to see whether our container is a ul and if not go ahead and replace the container.  This is just a precaution to keep the poop styles working.
    if (!self.poopContainer.is('ul'))
        self.poopContainer.replaceWith('<ul class="poop-container" />');
    

    // Make sure we have our poop-container class
    if(!self.poopContainer.hasClass('poop-container'))
        self.poopContainer.addClass('poop-container');

    // loop through and add the li poops with initial state of poop-off
    for (var i = 0; i < totalPoops; i++) {
        var poopLi = $('<li class="poop-item poop-off">💩</li>');
        // add our loop value plus one as we have 1 through however many poops were specified.
        poopLi.data('poopval', i + 1);
        // push our turd into our poops array
        self.poops.push(poopLi);
        // append the turd to our container
        self.poopContainer.append(poopLi);
    }

    // grab the children of our poopContainer and attach a mouseover event
    self.poopContainer.children('.poop-item').on('mouseover', function (event) {
        // get the int value attached as poopval to our element
        var index = parseInt($(this).data('poopval'));
        // loop through all the poops currently in our array
        for (var i = 0; i < self.poops.length; i++) {
            // declare what poop we are on for ease of syntax
            var poopitem = self.poops[i];
            // we loop up the list of poops lighting them up until we reach to poop we are over.
            if ((i + 1) <= index) {
                // check to see if our poop item already has the poop-on class assigned and leave alone if we do.  This reduces flicker of unassign and reassign on class.
                if (!poopitem.hasClass('poop-on')) {
                    // add poop-on and then remove poop-off
                    poopitem.addClass('poop-on');
                    poopitem.removeClass('poop-off');
                }
            } else {
                // here we are on a poop greater than what is hovered so for good measure make sure the poop-off class is assigned in case cleanup is needed.
                poopitem.addClass('poop-off');
                poopitem.removeClass('poop-on');
            }
        }
    });

    // good ol' click event for each poop-item
    self.poopContainer.children('.poop-item').on('click', function (event) {
        var thisKey = $(self).closest('.poop-card').data('key');
        var localKeys = localStorage.getItem('rated-keys');

        if(!localKeys || (localKeys &&  $.inArray(thisKey,JSON.parse(localKeys))) < 0){
            // assign our selectedPoopValue to the poopval on selected
            self.selectedPoopValue = $(this).data('poopval');
            // trigger a pooped event since we have a selection and pass the poop value selected.
            // you can grab this by subscribing with on such as $('#bla').on('pooped', function(event, value){ do something });
            self.trigger('pooped', self.selectedPoopValue);
        }else{
            //Message advising that rating has already been completed, fool!
        }
    });

    // on mouseout we want to reset to what the currently selected poop value is.
    self.poopContainer.on('mouseout', function (event) {
        if (self.selectedPoopValue)
            self.setPooSelection(self.selectedPoopValue)
    });

    // utility function to return the value as needed.
    this.val = function () {
        return self.selectedPoopValue;
    }

    // loops through all the poops and sets classes appropriately so the selected value is displayed properly.
    this.setPooSelection = function (val) {
        for (var i = 0; i < self.poops.length; i++) {
            var poopitem = self.poops[i];
            if ((i + 1) <= val) {
                if (!poopitem.hasClass('poop-on')) {
                    poopitem.addClass('poop-on');
                    poopitem.removeClass('poop-off');
                }

            } else {
                poopitem.addClass('poop-off');
                poopitem.removeClass('poop-on');
            }
        }
    };

    // if we have an initial value go ahead and set it
    if (self.selectedPoopValue)
        self.setPooSelection(self.selectedPoopValue)

    // assign our plugin as a data attribute on the element just in case we want to access it that way.
    this.data('poopRating', this);

    // return ourself.....
    return this;
}