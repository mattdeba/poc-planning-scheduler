const emptyString = new String();

export const frenchLocale = {

  localeName : 'Fr',
  localeDesc : 'Français (FR)',
  localeCode : 'fr-FR',

  Object : {
    Yes      : 'Oui',
    No       : 'Non',
    Cancel   : 'Annuler',
    Ok       : 'OK',
    Week     : 'Semaine',
    None     : 'Aucun',
    newEvent : 'Nouvel événement'
  },

  ColorPicker : {
    noColor : 'Aucune couleur'
  },

  Combo : {
    noResults          : 'Aucun résultat',
    recordNotCommitted : 'L’enregistrement n’a pas pu être ajouté',
    addNewValue        : (value: any) => `Ajouter ${value}`
  },

  FilePicker : {
    file : 'Fichier'
  },

  Field : {
    badInput              : 'Valeur du champ invalide',
    patternMismatch       : 'La valeur doit correspondre à un motif spécifique',
    rangeOverflow         : (value: { max: any; }) => `La valeur doit être inférieure ou égale à ${value.max}`,
    rangeUnderflow        : (value: { min: any; }) => `La valeur doit être supérieure ou égale à ${value.min}`,
    stepMismatch          : 'La valeur ne correspond pas à l’étape',
    tooLong               : 'La valeur doit être plus courte',
    tooShort              : 'La valeur doit être plus longue',
    typeMismatch          : 'La valeur doit être dans un format spécial',
    valueMissing          : 'Ce champ est requis',
    invalidValue          : 'Valeur du champ invalide',
    minimumValueViolation : 'Violation de la valeur minimale',
    maximumValueViolation : 'Violation de la valeur maximale',
    fieldRequired         : 'Ce champ est requis',
    validateFilter        : 'La valeur doit être sélectionnée dans la liste'
  },

  DateField : {
    invalidDate : 'Date invalide'
  },

  DatePicker : {
    gotoPrevYear  : 'Aller à l’année précédente',
    gotoPrevMonth : 'Aller au mois précédent',
    gotoNextMonth : 'Aller au mois suivant',
    gotoNextYear  : 'Aller à l’année suivante'
  },

  NumberFormat : {
    locale   : 'fr-FR',
    currency : 'EUR'
  },

  DurationField : {
    invalidUnit : 'Unité invalide'
  },

  TimeField : {
    invalidTime : 'Heure invalide'
  },

  TimePicker : {
    hour   : 'Heure',
    minute : 'Minute',
    second : 'Seconde'
  },

  List : {
    loading   : 'Chargement...',
    selectAll : 'Tout sélectionner'
  },

  GridBase : {
    loadMask           : 'Chargement...',
    syncMask           : 'Enregistrement des modifications, veuillez patienter...',
    loadFailedMessage  : 'Échec du chargement des données !',
    syncFailedMessage  : 'Échec de la synchronisation des données !',
    unspecifiedFailure : 'Échec non spécifié',
    networkFailure     : 'Erreur réseau',
    parseFailure       : 'Échec de l’analyse de la réponse du serveur',
    serverResponse     : 'Réponse du serveur :',
    noRows             : 'Aucun enregistrement à afficher',
    moveColumnLeft     : 'Déplacer vers la section gauche',
    moveColumnRight    : 'Déplacer vers la section droite',
    moveColumnTo       : (region: any) => `Déplacer la colonne vers ${region}`
  },

  PagingToolbar : {
    firstPage         : 'Aller à la première page',
    prevPage          : 'Aller à la page précédente',
    page              : 'Page',
    nextPage          : 'Aller à la page suivante',
    lastPage          : 'Aller à la dernière page',
    reload            : 'Recharger la page actuelle',
    noRecords         : 'Aucun enregistrement à afficher',
    pageCountTemplate : (data: { lastPage: any; }) => `sur ${data.lastPage}`,
    summaryTemplate   : (data: { start: any; end: any; allCount: any; }) => `Affichage des enregistrements ${data.start} à ${data.end} sur ${data.allCount}`
  },

  PanelCollapser : {
    Collapse : 'Réduire',
    Expand   : 'Étendre'
  },

  Popup : {
    close : 'Fermer'
  },

  UndoRedo : {
    Undo           : 'Annuler',
    Redo           : 'Rétablir',
    UndoLastAction : 'Annuler la dernière action',
    RedoLastAction : 'Rétablir la dernière action annulée',
    NoActions      : 'Aucun élément dans la file d’annulation'
  },

  FieldFilterPicker : {
    equals                 : 'équivaut à',
    doesNotEqual           : 'n’équivaut pas à',
    isEmpty                : 'est vide',
    isNotEmpty             : 'n’est pas vide',
    contains               : 'contient',
    doesNotContain         : 'ne contient pas',
    startsWith             : 'commence par',
    endsWith               : 'finit par',
    isOneOf                : 'est l’un de',
    isNotOneOf             : 'n’est pas l’un de',
    isGreaterThan          : 'est supérieur à',
    isLessThan             : 'est inférieur à',
    isGreaterThanOrEqualTo : 'est supérieur ou égal à',
    isLessThanOrEqualTo    : 'est inférieur ou égal à',
    isBetween              : 'est entre',
    isNotBetween           : 'n’est pas entre',
    isBefore               : 'est avant',
    isAfter                : 'est après',
    isToday                : 'est aujourd’hui',
    isTomorrow             : 'est demain',
    isYesterday            : 'est hier',
    isThisWeek             : 'est cette semaine',
    isNextWeek             : 'est la semaine prochaine',
    isLastWeek             : 'est la semaine dernière',
    isThisMonth            : 'est ce mois-ci',
    isNextMonth            : 'est le mois prochain',
    isLastMonth            : 'est le mois dernier',
    isThisYear             : 'est cette année',
    isNextYear             : 'est l’année prochaine',
    isLastYear             : 'est l’année dernière',
    isYearToDate           : 'est depuis le début de l’année',
    isTrue                 : 'est vrai',
    isFalse                : 'est faux',
    selectAProperty        : 'Sélectionnez une propriété',
    selectAnOperator       : 'Sélectionnez un opérateur',
    caseSensitive          : 'Sensible à la casse',
    and                    : 'et',
    dateFormat             : 'JJ/MM/AAAA',
    selectValue            : 'Sélectionnez une valeur',
    selectOneOrMoreValues  : 'Sélectionnez une ou plusieurs valeurs',
    enterAValue            : 'Entrez une valeur',
    enterANumber           : 'Entrez un nombre',
    selectADate            : 'Sélectionnez une date',
    selectATime            : 'Sélectionnez une heure'
  },

  FieldFilterPickerGroup : {
    addFilter : 'Ajouter un filtre'
  },

  DateHelper : {
    locale         : 'fr-FR',
    weekStartDay   : 1,
    nonWorkingDays : {
      0 : true,
      6 : true
    },
    weekends : {
      0 : true,
      6 : true
    },
    unitNames : [
      { single : 'milliseconde', plural : 'ms', abbrev : 'ms' },
      { single : 'seconde', plural : 'secondes', abbrev : 's' },
      { single : 'minute', plural : 'minutes', abbrev : 'min' },
      { single : 'heure', plural : 'heures', abbrev : 'h' },
      { single : 'jour', plural : 'jours', abbrev : 'j' },
      { single : 'semaine', plural : 'semaines', abbrev : 'sem' },
      { single : 'mois', plural : 'mois', abbrev : 'mois' },
      { single : 'trimestre', plural : 'trimestres', abbrev : 'trim' },
      { single : 'année', plural : 'années', abbrev : 'an' },
      { single : 'décennie', plural : 'décennies', abbrev : 'déc' }
    ],
    unitAbbreviations : [
      ['mil'],
      ['s', 'sec'],
      ['m', 'min'],
      ['h', 'hr'],
      ['j'],
      ['sem', 'se'],
      ['mo', 'mois'],
      ['trim', 'tri'],
      ['an', 'année'],
      ['déc']
    ],
    parsers : {
      L   : 'DD/MM/YYYY',
      LT  : 'HH:mm',
      LTS : 'HH:mm:ss'
    },
    ordinalSuffix : (number: string) => {
      const hasSpecialCase = ['11', '12', '13'].find((n) => number.endsWith(n));
      let suffix = 'ème';
      if (!hasSpecialCase) {
        const lastDigit = number[number.length - 1];
        suffix = { 1 : 'er', 2 : 'ème', 3 : 'ème' }[lastDigit] || 'ème';
      }

      return number + suffix;
    }
  },

  ColumnPicker : {
    column          : 'Colonne',
    columnsMenu     : 'Colonnes',
    hideColumn      : 'Masquer la colonne',
    hideColumnShort : 'Masquer',
    newColumns      : 'Nouvelles colonnes'
  },

  Filter : {
    applyFilter   : 'Appliquer le filtre',
    filter        : 'Filtre',
    editFilter    : 'Modifier le filtre',
    on            : 'Activé',
    before        : 'Avant',
    after         : 'Après',
    equals        : 'Équivaut à',
    lessThan      : 'Inférieur à',
    moreThan      : 'Supérieur à',
    removeFilter  : 'Supprimer le filtre',
    disableFilter : 'Désactiver le filtre'
  },

  FilterBar : {
    enableFilterBar  : 'Afficher la barre de filtre',
    disableFilterBar : 'Masquer la barre de filtre'
  },

  Group : {
    group                : 'Grouper',
    groupAscending       : 'Grouper par ordre croissant',
    groupDescending      : 'Grouper par ordre décroissant',
    groupAscendingShort  : 'Ascendant',
    groupDescendingShort : 'Descendant',
    stopGrouping         : 'Arrêter le groupement',
    stopGroupingShort    : 'Arrêter'
  },

  HeaderMenu : {
    moveBefore     : (text: any) => `Déplacer avant "${text}"`,
    moveAfter      : (text: any) => `Déplacer après "${text}"`,
    collapseColumn : 'Réduire la colonne',
    expandColumn   : 'Étendre la colonne'
  },

  ColumnRename : {
    rename : 'Renommer'
  },

  MergeCells : {
    mergeCells  : 'Fusionner les cellules',
    menuTooltip : 'Fusionner les cellules ayant la même valeur lorsqu’elles sont triées par cette colonne'
  },

  Search : {
    searchForValue : 'Rechercher une valeur'
  },

  Sort : {
    sort                   : 'Trier',
    sortAscending          : 'Trier par ordre croissant',
    sortDescending         : 'Trier par ordre décroissant',
    multiSort              : 'Tri multiple',
    removeSorter           : 'Retirer le tri',
    addSortAscending       : 'Ajouter un tri croissant',
    addSortDescending      : 'Ajouter un tri décroissant',
    toggleSortAscending    : 'Changer en ordre croissant',
    toggleSortDescending   : 'Changer en ordre décroissant',
    sortAscendingShort     : 'Croissant',
    sortDescendingShort    : 'Décroissant',
    removeSorterShort      : 'Retirer',
    addSortAscendingShort  : '+ Croissant',
    addSortDescendingShort : '+ Décroissant'
  },

  Split : {
    split        : 'Scinder',
    unsplit      : 'Annuler la scission',
    horizontally : 'Horizontalement',
    vertically   : 'Verticalement',
    both         : 'Les deux'
  },

  Column : {
    columnLabel : (column: { text: any; sortable: any; }) => `${column.text ? `${column.text} colonne. ` : ''}ESPACE pour le menu contextuel${column.sortable ? ', ENTRÉE pour trier' : ''}`,
    cellLabel   : emptyString
  },

  Checkbox : {
    toggleRowSelect : 'Basculer la sélection de ligne',
    toggleSelection : 'Basculer la sélection de l’ensemble des données'
  },

  RatingColumn : {
    cellLabel : (column: { text: any; location: { record: { get: (arg0: any) => any; }; }; field: any; }) => `${column.text ? column.text : ''} ${column.location?.record ? `note : ${column.location.record.get(column.field) || 0}` : ''}`
  },

  CellMenu : {
    removeRow : 'Supprimer'
  },

  RowCopyPaste : {
    copyRecord  : 'Copier',
    cutRecord   : 'Couper',
    pasteRecord : 'Coller',
    rows        : 'lignes',
    row         : 'ligne'
  },

  CellCopyPaste : {
    copy  : 'Copier',
    cut   : 'Couper',
    paste : 'Coller'
  },

  PdfExport : {
    'Waiting for response from server' : 'En attente de réponse du serveur...',
    'Export failed'                    : 'Échec de l’exportation',
    'Server error'                     : 'Erreur du serveur',
    'Generating pages'                 : 'Génération des pages...',
    'Click to abort'                   : 'Cliquer pour annuler'
  },

  ExportDialog : {
    width          : '40em',
    labelWidth     : '12em',
    exportSettings : 'Paramètres d’exportation',
    export         : 'Exporter',
    printSettings  : 'Paramètres d’impression',
    print          : 'Imprimer',
    exporterType   : 'Contrôle de la pagination',
    cancel         : 'Annuler',
    fileFormat     : 'Format de fichier',
    rows           : 'Lignes',
    alignRows      : 'Aligner les lignes',
    columns        : 'Colonnes',
    paperFormat    : 'Format de papier',
    orientation    : 'Orientation',
    repeatHeader   : 'Répéter l’en-tête'
  },

  ExportRowsCombo : {
    all     : 'Toutes les lignes',
    visible : 'Lignes visibles'
  },

  ExportOrientationCombo : {
    portrait  : 'Portrait',
    landscape : 'Paysage'
  },

  SinglePageExporter : {
    singlepage : 'Une seule page'
  },

  MultiPageExporter : {
    multipage     : 'Plusieurs pages',
    exportingPage : ({ currentPage, totalPages }: any) => `Exportation de la page ${currentPage}/${totalPages}`
  },

  MultiPageVerticalExporter : {
    multipagevertical : 'Plusieurs pages (vertical)',
    exportingPage     : ({ currentPage, totalPages }: any) => `Exportation de la page ${currentPage}/${totalPages}`
  },

  RowExpander : {
    loading  : 'Chargement',
    expand   : 'Développer',
    collapse : 'Réduire'
  },

  TreeGroup : {
    group                  : 'Grouper par',
    stopGrouping           : 'Arrêter le groupement',
    stopGroupingThisColumn : 'Ne plus grouper par cette colonne'
  },

  ResourceInfoColumn : {
    eventCountText : (data: string | number) => data + ' événement' + (data !== 1 ? 's' : '')
  },

  Dependencies : {
    from    : 'De',
    to      : 'À',
    valid   : 'Valide',
    invalid : 'Invalide'
  },

  DependencyType : {
    SS           : 'DD',
    SF           : 'DF',
    FS           : 'FD',
    FF           : 'FF',
    StartToStart : 'Début à Début',
    StartToEnd   : 'Début à Fin',
    EndToStart   : 'Fin à Début',
    EndToEnd     : 'Fin à Fin',
    short        : [
      'DD',
      'DF',
      'FD',
      'FF'
    ],
    long : [
      'Début à Début',
      'Début à Fin',
      'Fin à Début',
      'Fin à Fin'
    ]
  },

  DependencyEdit : {
    From              : 'De',
    To                : 'À',
    Type              : 'Type',
    Lag               : 'Délai',
    'Edit dependency' : 'Modifier la dépendance',
    Save              : 'Sauvegarder',
    Delete            : 'Supprimer',
    Cancel            : 'Annuler',
    StartToStart      : 'Début à Début',
    StartToEnd        : 'Début à Fin',
    EndToStart        : 'Fin à Début',
    EndToEnd          : 'Fin à Fin'
  },

  EventEdit : {
    Name         : 'Nom',
    Resource     : 'Ressource',
    Start        : 'Début',
    End          : 'Fin',
    Save         : 'Enregistrer',
    Delete       : 'Supprimer',
    Cancel       : 'Annuler',
    'Edit event' : 'Modifier l’événement',
    Repeat       : 'Répéter'
  },

  EventDrag : {
    eventOverlapsExisting : 'L’événement chevauche un événement existant pour cette ressource',
    noDropOutsideTimeline : 'L’événement ne peut pas être déposé en dehors de la chronologie'
  },

  SchedulerBase : {
    'Add event'      : 'Ajouter un événement',
    'Delete event'   : 'Supprimer l’événement',
    'Unassign event' : 'Désassigner l’événement',
    color            : 'Couleur'
  },

  TimeAxisHeaderMenu : {
    pickZoomLevel   : 'Choisir le niveau de zoom',
    activeDateRange : 'Plage de dates active',
    startText       : 'Date de début',
    endText         : 'Date de fin',
    todayText       : 'Aujourd’hui'
  },

  EventCopyPaste : {
    copyEvent  : 'Copier l’événement',
    cutEvent   : 'Couper l’événement',
    pasteEvent : 'Coller l’événement'
  },

  EventFilter : {
    filterEvents : 'Filtrer les tâches',
    byName       : 'Par nom'
  },

  TimeRanges : {
    showCurrentTimeLine : 'Afficher la ligne de temps actuelle'
  },

  PresetManager : {
    secondAndMinute : {
      displayDateFormat : 'll LTS',
      name              : 'Secondes'
    },
    minuteAndHour : {
      topDateFormat     : 'ddd DD/MM, HHh',
      displayDateFormat : 'll LTS'
    },
    hourAndDay : {
      topDateFormat     : 'ddd DD/MM',
      middleDateFormat  : 'LTS',
      displayDateFormat : 'll LTS',
      name              : 'Jour'
    },
    day : {
      name : 'Jour/Heures'
    },
    week : {
      name : 'Semaine/Heures'
    },
    dayAndWeek : {
      displayDateFormat : 'll LTS',
      name              : 'Semaine/Jours'
    },
    dayAndMonth : {
      name : 'Mois'
    },
    weekAndDay : {
      displayDateFormat : 'll LTS',
      name              : 'Semaine'
    },
    weekAndMonth : {
      name : 'Semaines'
    },
    weekAndDayLetter : {
      name : 'Semaines/Jours de la semaine'
    },
    weekDateAndMonth : {
      name : 'Mois/Semaines'
    },
    monthAndYear : {
      name : 'Mois'
    },
    year : {
      name : 'Années'
    },
    manyYears : {
      name : 'Plusieurs années'
    }
  },

  RecurrenceConfirmationPopup : {
    'delete-title'              : 'Vous supprimez un événement',
    'delete-all-message'        : 'Voulez-vous supprimer toutes les occurrences de cet événement ?',
    'delete-further-message'    : 'Voulez-vous supprimer cette occurrence et toutes les futures occurrences de cet événement, ou seulement l’occurrence sélectionnée ?',
    'delete-further-btn-text'   : 'Supprimer tous les événements futurs',
    'delete-only-this-btn-text' : 'Supprimer uniquement cet événement',
    'update-title'              : 'Vous modifiez un événement récurrent',
    'update-all-message'        : 'Voulez-vous modifier toutes les occurrences de cet événement ?',
    'update-further-message'    : 'Voulez-vous modifier uniquement cette occurrence de l’événement, ou celle-ci et toutes les futures occurrences ?',
    'update-further-btn-text'   : 'Tous les événements futurs',
    'update-only-this-btn-text' : 'Uniquement cet événement',
    Yes                         : 'Oui',
    Cancel                      : 'Annuler',
    width                       : 600
  },

  RecurrenceLegend : {
    ' and '                         : ' et ',
    Daily                           : 'Quotidien',
    'Weekly on {1}'                 : ({ days }: any) => `Hebdomadaire le ${days}`,
    'Monthly on {1}'                : ({ days }: any) => `Mensuel le ${days}`,
    'Yearly on {1} of {2}'          : ({ days, months }: any) => `Annuel le ${days} de ${months}`,
    'Every {0} days'                : ({ interval }: any) => `Tous les ${interval} jours`,
    'Every {0} weeks on {1}'        : ({ interval, days }: any) => `Toutes les ${interval} semaines le ${days}`,
    'Every {0} months on {1}'       : ({ interval, days }: any) => `Tous les ${interval} mois le ${days}`,
    'Every {0} years on {1} of {2}' : ({ interval, days, months }: any) => `Tous les ${interval} ans le ${days} de ${months}`,
    position1                       : 'le premier',
    position2                       : 'le deuxième',
    position3                       : 'le troisième',
    position4                       : 'le quatrième',
    position5                       : 'le cinquième',
    'position-1'                    : 'le dernier',
    day                             : 'jour',
    weekday                         : 'jour de la semaine',
    'weekend day'                   : 'jour du weekend',
    daysFormat                      : ({ position, days }: any) => `${position} ${days}`
  },

  RecurrenceEditor : {
    'Repeat event'      : 'Répéter l’événement',
    Cancel              : 'Annuler',
    Save                : 'Enregistrer',
    Frequency           : 'Fréquence',
    Every               : 'Chaque',
    DAILYintervalUnit   : 'jour(s)',
    WEEKLYintervalUnit  : 'semaine(s)',
    MONTHLYintervalUnit : 'mois',
    YEARLYintervalUnit  : 'année(s)',
    Each                : 'Chaque',
    'On the'            : 'Le',
    'End repeat'        : 'Fin de répétition',
    'time(s)'           : 'fois'
  },

  RecurrenceDaysCombo : {
    day           : 'jour',
    weekday       : 'jour de la semaine',
    'weekend day' : 'jour du weekend'
  },

  RecurrencePositionsCombo : {
    position1    : 'premier',
    position2    : 'deuxième',
    position3    : 'troisième',
    position4    : 'quatrième',
    position5    : 'cinquième',
    'position-1' : 'dernier'
  },

  RecurrenceStopConditionCombo : {
    Never     : 'Jamais',
    After     : 'Après',
    'On date' : 'À la date'
  },

  RecurrenceFrequencyCombo : {
    None    : 'Pas de répétition',
    Daily   : 'Quotidien',
    Weekly  : 'Hebdomadaire',
    Monthly : 'Mensuel',
    Yearly  : 'Annuel'
  },

  RecurrenceCombo : {
    None   : 'Aucun',
    Custom : 'Personnalisé...'
  },

  Summary : {
    'Summary for' : (date: any) => `Résumé pour ${date}`
  },

  ScheduleRangeCombo : {
    completeview : 'Calendrier complet',
    currentview  : 'Calendrier visible',
    daterange    : 'Plage de dates',
    completedata : 'Calendrier complet (pour tous les événements)'
  },

  SchedulerExportDialog : {
    'Schedule range' : 'Plage du calendrier',
    'Export from'    : 'De',
    'Export to'      : 'À'
  },

  ExcelExporter : {
    'No resource assigned' : 'Aucune ressource assignée'
  },

  CrudManagerView : {
    serverResponseLabel : 'Réponse du serveur :'
  },

  DurationColumn : {
    Duration : 'Durée'
  }
};
