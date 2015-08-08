$(function() {
    $.getJSON("/time-tracker/controller/monsters", function(data) {
        $.each(data, function() {
            var template = "<option value='{{id}}'>{{name}}</option>";
            var newOption = $(Mustache.render(template, this));
            newOption.data(this);
            $(".monstertype").append(newOption);
            $('.hitpoints').change();
        });
    });

    loadEncounterMenu();

    $("body")
    .on('change', '.monster-count', function() {
        var $container = $(this).parents('.monster-type-container').find(".monsters-hp-container");
        $container.empty();
        for (var i = 0; i < $(this).val(); i++) {
            $container.append("<div class='monster-hp-container'><input type='number' name='encounterMonsters["+i+"][maxHitPoints]' class='hitpoints' value='1' /> HP</div>");
        }
        $container.children('input').change();
    })
    .on('change', '.monstertype', function() {
        var $data = $(this).find('option:selected').data();
        var $container = $(this).parents('.monster-type-container');
        $container.find('.encounter-id').val($data.encounter_id)
        $container.find('.hitdie').html($data.hit_dice);
        var sign = Number($data.HitModifier) < 0 ? '' : '+';
        $container.find('.hitdie-modifier').html(sign + $data.hit_die_modifier);
        $container.find('.armor-class').html($data.armor_class);
        $container.find('.num-attacks').html($data.attack_count);
        $container.find('.size').html($data.size);
        $container.find('.movement').html($data.movement);
        $container.find('.treasure').html($data.treasure);
        $container.find('.damagePerAttack').html($data.damage_per_attack);
        $container.find('.notes').html($data.notes);
        $container.find('.specialAbilities').html($data.special_abilities);
        $container.find('.exceptionalAbilities').html($data.exceptional_abilities);
    })
    .on('change', '#encounterList', function(event) {
        event.preventDefault();
        var url = "/time-tracker/controller/encounter/" + $(this).val();
        $.getJSON(url, function(encounter) {
            $('.monster-type-container:not(.template)').remove();
            $('#encounter-name').val(encounter.name);
            $('#encounter-id').val(encounter.id);
            $.each(encounter.encounterMonsterTypes, function(index, encounterMonsterType) {
                var $newContainer = $('.monster-type-container.template').clone(true);
                $newContainer.removeClass('template');
                $('#encounterContainer').append($newContainer);
                $newContainer.find('select.monstertype').val(encounterMonsterType.monsterType.id);
                var $encounterMonsterContainer = $newContainer.find(".monsters-hp-container");
                $encounterMonsterContainer.empty();
                for (var i = 0; i < encounterMonsterType.encounterMonsters.length; i++) {
                    var encounterMonster = encounterMonsterType.encounterMonsters[i];
                    var checked = encounterMonster.dead ? 'checked="checked"' : '';
                    $encounterMonsterContainer.append("<div class='monster-hp-container'>" +
                    "<input type='number' name='encounterMonsters["+i+"][maxHitPoints]' class='hitpoints' value='"+encounterMonster.maxHitPoints+"' /> HP</div>");
                }
                $newContainer.find('.monster-count').val(encounterMonsterType.encounterMonsters.length);
                $newContainer.find('.strategy').val(encounterMonsterType.strategy);
                $newContainer.find('.treasureInput').val(encounterMonsterType.treasure);
            });
            $('.monstertype').change();

        });
    })
    .on('click', '#delete-button', function(event) {
        if (confirm("Really delete this encounter?")) {
            $.ajax({
                url: '/time-tracker/controller/encounter/' + $("#encounter-id").val(),
                type: 'DELETE',
                success: function(data) {
                    if (data == 'success') {
                        loadEncounterMenu();
                    } else {
                        alert('Failed to delete.');
                    }
                }
            });
        }
    });
    $('.monster-count').change();

    $('#add-new-monster-type').click(function() {
        var $newContainer = $('.monster-type-container.template').clone(true);
        $newContainer.removeClass('template');
        $('#encounterContainer').append($newContainer);
    });

    $('#save-button').click(function() {
        //$("form.monster-type-container:not(.template)").submit();
        //event.preventDefault();
        var url = '/time-tracker/controller/encounter';
        if ($("#encounter-id").val()) {
            url += '/' + $("#encounter-id").val()
        }
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: $("#encounter-form").serializeJSON(),
            complete: function(data) {

                var encounterId = Number(data.responseJSON);
                $("#encounter-id").val(encounterId);
                $("form.monster-type-container:not(.template)").each(function() {
                    var monsterTypeJson = $(this).serializeJSON();
                    $.ajax({
                        url: '/time-tracker/controller/encounter/'+encounterId+'/monster-type',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: monsterTypeJson,
                        complete: function(data) {
                            alert(data.responseText);
                        }
                    });
                });

            }
        });


    });

    //$("body").on('submit', 'form.monster-type-container:not(.template)', function(event) {
    //    event.preventDefault();
    //    $.ajax({
    //        url: 'controller/encounter',
    //        type: 'POST',
    //        dataType: 'json',
    //        contentType: 'application/json',
    //        data: $(this).serializeJSON(),
    //        complete: function(data) {
    //            alert(data);
    //        }
    //    });
    //});
});

var calculateXp = function () {
    if ($(this).hasClass('hitpoints')) {
        var $monstertype = $(this).parents('.monster-type-container').find('.monstertype option:selected');
    } else if ($(this).hasClass('monstertype')) {
        var $monstertype = $(this).find('option:selected');
    }
    if ($monstertype.val() == '') {
        return;
    }
    var monsterType = $monstertype.data();
    $.getJSON('/time-tracker/controller/base-xp',
        {
            hitDice: monsterType.HD,
            modifier: monsterType.HitModifier
        },
        function (data) {
            var monsterCount = $('.hitpoints').length;
            var totalHitPoints = 0;
            $('.hitpoints').each(function () {
                totalHitPoints += Number($(this).val());
            });
            var xpData = data[0];
            var baseXp = xpData.basic_xp;
            var hitPointXp = xpData.hit_point_xp;
            var specialAbilityCount = monsterType.special_ability_count;
            var specialAbilityXp = xpData.special_ability_xp;
            var exceptionalAbilityCount = monsterType.exceptional_ability_count;
            var exceptionalAbilityXp = xpData.exceptional_ability_xp;
            var calculatedXp = (totalHitPoints * hitPointXp) + monsterCount * (baseXp + (specialAbilityCount * specialAbilityXp) + (exceptionalAbilityCount * exceptionalAbilityXp));
            $('#calculatedXp').html(calculatedXp);
        });
};

var loadEncounterMenu = function() {

    $.getJSON("/time-tracker/controller/encounters", function(data) {
        var template = "<option value='{{id}}'>{{name}}</option>";
        $("#encounterList").empty();
        $("#encounterList").append("<option value=''>Create new encounter...</option>");
        $.each(data, function() {
            var newItem = $(Mustache.render(template, this));
            $("#encounterList").append(newItem);
        })
    });
}