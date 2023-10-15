jQuery(function ($) {
    $(".range").each(function () {
        let $this = $(this),
            $slider = $this.find(".slider-range input"),
            $inputFrom = $this.find(".range-input-min"),
            $inputTo = $this.find(".range-input-max"),
            $min = +$slider.data('min'),
            $max = +$slider.data('max');


        $slider.ionRangeSlider({
            skin: "round",
            type: "double",
            hide_min_max: true,
            hide_from_to: true,
            min: $min,
            max: $max,

            onStart: updateInputs,
            onChange: updateInputs,
            onFinish: updateInputs
        });


        $instance = $slider.data("ionRangeSlider");

        function updateInputs(data) {
            from = Math.floor(data.from);
            to = Math.ceil(data.to);

            $inputFrom.prop("value", from);
            $inputTo.prop("value", to);
        }

        $inputFrom.on("change", function () {
            let val = $(this).prop("value");

            // validate
            if (val < $min) {
                val = $min;
            } else if (val > to) {
                val = to;
            }

            $instance.update({
                from: val
            });

            $(this).prop("value", val);
        });

        $inputTo.on("change", function () {
            let val = $(this).prop("value");

            // validate
            if (val < from) {
                val = from;
            } else if (val > $max) {
                val = $max;
            }

            $instance.update({
                to: val
            });

            $(this).prop("value", val);
        });

        _functions.upDateRange = function () {
            $instance.update({
                from: $min,
                to: $max,
            });

            $inputFrom.prop("value", $min);
            $inputTo.prop("value", $max);
        }
    });
});