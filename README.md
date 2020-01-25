# openhab Cloud & Weather Widget
Das Widget zeigt f�r die n�chsten 7 Tage die Bew�lkung und Niederschl�ge an.
Ziel ist der Support von Solaranlagen entsprechende Massnahmen zu ergreifen wie z.B. das Elektro Auto vor einer l�ngeren Bew�lkungsphase noch einmal zu laden

# Installation
## Dark Sky Wetter API
Die Vorhersage nutzt den freien Service [Dark Sky] (https://darksky.net/dev)
Bindig installieren
Items anlegen

## Statische Inhalte
kopiere den Inhalt des Ordners "static" aus diesem repository auf deinen openhab Server %DEIN_LAUFWERK%:\openhab2-conf\html
F�ge das css von font awesome in die Einstellungen des Panels

## Widget Import
Importieren das Widget aus diesem Repository
Verkn�pfe die Items aus dem Schritt 1 mit den Input Items des Widgets
