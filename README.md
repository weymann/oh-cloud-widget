# openhab Cloud & Weather Widget
Das Widget zeigt für die nächsten 7 Tage die Bewölkung und Niederschläge an.
Ziel ist der Support von Solaranlagen entsprechende Massnahmen zu ergreifen wie z.B. das Elektro Auto vor einer längeren Bewölkungsphase noch einmal zu laden

# Installation
## Dark Sky Wetter API
Die Vorhersage nutzt den freien Service [Dark Sky] (https://darksky.net/dev)
Bindig installieren
Items anlegen

## Statische Inhalte
kopiere den Inhalt des Ordners "static" aus diesem repository auf deinen openhab Server %DEIN_LAUFWERK%:\openhab2-conf\html
Füge das css von font awesome in die Einstellungen des Panels

## Widget Import
Importieren das Widget aus diesem Repository
Verknüpfe die Items aus dem Schritt 1 mit den Input Items des Widgets
