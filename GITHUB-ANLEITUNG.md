# Website auf GitHub bringen – Schritt für Schritt

Das Projekt ist vorbereitet. Nach jeder Änderung, die du auf GitHub
hochlädst, baut GitHub die Website automatisch und veröffentlicht sie
kostenlos über **GitHub Pages**.

Am einfachsten geht es mit dem Programm **GitHub Desktop**. Damit ist keine
Kommandozeile nötig.

---

## Schritt 1 – GitHub-Konto erstellen

1. Öffne <https://github.com/signup>.
2. Erstelle ein Konto mit E-Mail und Passwort. Deinen Benutzernamen siehst
   du später in der Adresse, z. B. `leongreuter`.

## Schritt 2 – GitHub Desktop installieren

1. Lade GitHub Desktop von <https://desktop.github.com> herunter und
   installiere es. Git wird dabei automatisch mitinstalliert.
2. Starte GitHub Desktop und melde dich mit deinem GitHub-Konto an:
   **File → Options → Accounts → Sign in**.

## Schritt 3 – Projektordner als Repository anlegen

1. In GitHub Desktop: **File → Add local repository…**
2. Wähle den Ordner `E:\Claude\Webseite_GreuterGartengestaltung`.
3. GitHub Desktop meldet, dass der Ordner noch kein Repository ist. Klicke
   auf **create a repository**.
4. Name: z. B. `greuter-website`. Die übrigen Felder lässt du unverändert
   (die Datei `.gitignore` ist schon vorhanden). Dann **Create repository**.

## Schritt 4 – Auf GitHub hochladen

1. Klicke oben auf **Publish repository**.
2. **Wichtig:** Entferne das Häkchen bei **Keep this code private**.
   GitHub Pages ist mit einem kostenlosen Konto nur für öffentliche
   Repositories verfügbar. Öffentlich heisst: Quellcode und Bilder sind auf
   GitHub einsehbar. Die Inhalte stehen ohnehin auf der Website.
3. **Publish repository** klicken.

## Schritt 5 – GitHub Pages einschalten (einmalig)

1. Öffne dein Repository im Browser: in GitHub Desktop über
   **Repository → View on GitHub**.
2. Gehe zu **Settings → Pages**.
3. Wähle bei **Build and deployment → Source** den Eintrag **GitHub Actions**.
4. Öffne den Reiter **Actions** und wähle dort **Website veröffentlichen**
   und dann **Run workflow**. Ab jetzt läuft das bei jedem Hochladen
   automatisch.
5. Nach ungefähr 2 Minuten ist die Website online unter:
   `https://DEIN-BENUTZERNAME.github.io/greuter-website/`

## Schritt 6 – Änderungen veröffentlichen (immer wieder)

1. Ändere Dateien wie gewohnt (Texte, Bilder …).
2. GitHub Desktop zeigt die Änderungen links an. Unten bei **Summary**
   schreibst du eine kurze Beschreibung, z. B. „Neue Fotos Stein“.
3. Klicke auf **Commit to main** und danach auf **Push origin**.
4. Nach ungefähr 2 Minuten ist die neue Version online.
   Den Fortschritt siehst du auf GitHub im Reiter **Actions**.

Neue Bilder vorher wie gewohnt mit `npm.cmd run images` umwandeln. Die
erzeugten Dateien in `public/assets` werden mit hochgeladen.

---

## Optional – Eigene Domain www.greutergarten.ch

Erst machen, wenn die neue Website die alte ersetzen soll.

1. Auf GitHub: **Settings → Pages → Custom domain** → `www.greutergarten.ch`
   eintragen und auf **Save** klicken.
2. Beim Domain-Anbieter von greutergarten.ch die DNS-Einträge ändern:
   - `www` → **CNAME** auf `DEIN-BENUTZERNAME.github.io`
   - für `greutergarten.ch` ohne www vier **A-Einträge**:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Wenn die Domain erkannt wird, auf GitHub das Häkchen **Enforce HTTPS** setzen.
4. Im Reiter **Actions** den Workflow noch einmal starten (**Run workflow**).
   Die Website wird dann automatisch für die Domain ohne Unterordner gebaut.

**Achtung:** Prüfe vor der DNS-Änderung, ob beim Anbieter noch etwas
anderes an der Domain hängt, vor allem die **E-Mail-Adresse**
tgreuter@greutergarten.ch. Die E-Mail-Einträge (MX) dürfen dabei **nicht**
verändert werden.

---

## Was technisch vorbereitet ist

- `.github/workflows/deploy.yml` baut die Website bei jedem Hochladen auf den
  Branch `main` und veröffentlicht sie auf GitHub Pages.
- Die Website funktioniert sowohl unter einer Unteradresse
  (`…github.io/greuter-website/`) als auch direkt unter einer eigenen
  Domain. Der Workflow erkennt das automatisch (Variable `BASE_PATH`).
- `.gitignore` schliesst `node_modules`, `dist` und lokale Einstellungen aus.
