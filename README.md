<h1 align="center">Tudo Aberto</h1>

<h3 align="center">Os softwares do mundo. Reconstruídos, abertos e sob licença MIT — em português.</h3>

> **Aviso:** o Tudo Aberto é um *fork* traduzido para português do Brasil do projeto [HeyPuter/everything](https://github.com/HeyPuter/everything), distribuído sob a [licença MIT](LICENSE). Todo o crédito pelo código original é dos autores do HeyPuter; o arquivo [LICENSE](LICENSE) original foi mantido intacto. Este fork não é afiliado, patrocinado nem endossado pelo Puter/HeyPuter. Veja [NOTICE.md](NOTICE.md).

O Tudo Aberto busca reconstruir do zero e abrir o código dos softwares do mundo. Do Office ao Slack, do Photoshop ao AutoCAD, recriamos alternativas gratuitas e de código aberto a softwares proprietários. Este é um monorrepositório com todos os aplicativos e ferramentas do projeto.

[Escritório](#escritório) · [Colaboração](#colaboração) · [Criação](#criação) · [Engenharia](#engenharia) · [Produtividade](#produtividade) · [Finanças](#finanças) · [Negócios](#negócios) · [Desenvolvimento](#desenvolvimento) · [Jogos](#jogos)

<br>

## Primeiros passos

Requer Node.js 22.12 ou mais recente.

```sh
git clone https://github.com/belchiorjuniorr2/tudo-aberto.git
cd tudo-aberto/src/[nome-do-app]
npm install
npm run dev
```

Os apps usam o SDK do [Puter](https://docs.puter.com/) (`js.puter.com`) como backend opcional de login e armazenamento em nuvem — por isso alguns textos mencionam "nuvem Puter". Os links "Demo original" apontam para as versões hospedadas pelo projeto original (em inglês).

<br>

## Escritório

<table width="100%">
<tr><th width="296" align="left">Aplicativo</th><th width="420" align="left">Alternativa a</th><th width="150" align="left">Links</th></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/spreadsheet/"><img src="src/spreadsheet/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/spreadsheet/">Planilhas</a></strong> <sub>(Spreadsheet)</sub></td><td width="420" valign="middle">Microsoft Excel, Google Sheets, Apple Numbers</td><td width="150" valign="middle" nowrap><a href="src/spreadsheet/">Código</a>&nbsp;|&nbsp;<a href="https://spreadsheet.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/documents/"><img src="src/documents/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/documents/">Documentos</a></strong> <sub>(Documents)</sub></td><td width="420" valign="middle">Microsoft Word, Google Docs, Apple Pages</td><td width="150" valign="middle" nowrap><a href="src/documents/">Código</a>&nbsp;|&nbsp;<a href="https://documents.puter.com">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/presentation/"><img src="src/presentation/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/presentation/">Apresentações</a></strong> <sub>(Presentation)</sub></td><td width="420" valign="middle">Microsoft PowerPoint, Google Slides, Apple Keynote</td><td width="150" valign="middle" nowrap><a href="src/presentation/">Código</a>&nbsp;|&nbsp;<a href="https://presentation.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/whiteboard/"><img src="src/whiteboard/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/whiteboard/">Quadro Branco</a></strong> <sub>(Whiteboard)</sub></td><td width="420" valign="middle">Miro, Microsoft Whiteboard, FigJam</td><td width="150" valign="middle" nowrap><a href="src/whiteboard/">Código</a>&nbsp;|&nbsp;<a href="https://whiteboard.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/pdf/"><img src="src/pdf/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/pdf/">PDF</a></strong> <sub>(PDF)</sub></td><td width="420" valign="middle">Adobe Acrobat, PDF Expert</td><td width="150" valign="middle" nowrap><a href="src/pdf/">Código</a>&nbsp;|&nbsp;<a href="https://pdf.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/notes/"><img src="src/notes/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/notes/">Anotações</a></strong> <sub>(Notes)</sub></td><td width="420" valign="middle">Microsoft OneNote, Evernote, Apple Notes</td><td width="150" valign="middle" nowrap><a href="src/notes/">Código</a>&nbsp;|&nbsp;<a href="https://notes.puter.com">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/records/"><img src="src/records/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/records/">Registros</a></strong> <sub>(Records)</sub></td><td width="420" valign="middle">Airtable, Microsoft Access, Baserow</td><td width="150" valign="middle" nowrap><a href="src/records/">Código</a>&nbsp;|&nbsp;<a href="https://records.puter.com/">Demo original</a></td></tr>
</table>

<br>

## Colaboração

<table width="100%">
<tr><th width="296" align="left">Aplicativo</th><th width="420" align="left">Alternativa a</th><th width="150" align="left">Links</th></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/meetings/"><img src="src/meetings/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/meetings/">Reuniões</a></strong> <sub>(Meetings)</sub></td><td width="420" valign="middle">Zoom, Google Meet, Microsoft Teams</td><td width="150" valign="middle" nowrap><a href="src/meetings/">Código</a>&nbsp;|&nbsp;<a href="https://meetings.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/teamchat/"><img src="src/teamchat/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/teamchat/">Chat da Equipe</a></strong> <sub>(Teamchat)</sub></td><td width="420" valign="middle">Slack, Microsoft Teams, Google Chat</td><td width="150" valign="middle" nowrap><a href="src/teamchat/">Código</a>&nbsp;|&nbsp;<a href="https://teamchat.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/email/"><img src="src/email/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/email/">E-mail</a></strong> <sub>(Email)</sub></td><td width="420" valign="middle">Gmail, Microsoft Outlook, Apple Mail</td><td width="150" valign="middle" nowrap><a href="src/email/">Código</a>&nbsp;|&nbsp;<a href="https://email.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/contacts/"><img src="src/contacts/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/contacts/">Contatos</a></strong> <sub>(Contacts)</sub></td><td width="420" valign="middle">Google Contacts, Apple Contacts</td><td width="150" valign="middle" nowrap><a href="src/contacts/">Código</a>&nbsp;|&nbsp;<a href="https://contacts.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/calendar/"><img src="src/calendar/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/calendar/">Agenda</a></strong> <sub>(Calendar)</sub></td><td width="420" valign="middle">Google Calendar, Apple Calendar, Outlook Calendar</td><td width="150" valign="middle" nowrap><a href="src/calendar/">Código</a>&nbsp;|&nbsp;<a href="https://calendar.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/signatures/"><img src="src/signatures/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/signatures/">Assinaturas</a></strong> <sub>(Signatures)</sub></td><td width="420" valign="middle">DocuSign, Adobe Acrobat Sign, Dropbox Sign</td><td width="150" valign="middle" nowrap><a href="src/signatures/">Código</a>&nbsp;|&nbsp;<a href="https://sign.puter.com">Demo original</a></td></tr>
</table>

<br>

## Criação

<table width="100%">
<tr><th width="296" align="left">Aplicativo</th><th width="420" align="left">Alternativa a</th><th width="150" align="left">Links</th></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/photo-studio/"><img src="src/photo-studio/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/photo-studio/">Estúdio de Fotos</a></strong> <sub>(Photo Studio)</sub></td><td width="420" valign="middle">Adobe Photoshop, Pixelmator</td><td width="150" valign="middle" nowrap><a href="src/photo-studio/">Código</a>&nbsp;|&nbsp;<a href="https://ps.puter.com">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/video-studio/"><img src="src/video-studio/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/video-studio/">Estúdio de Vídeo</a></strong> <sub>(Video Studio)</sub></td><td width="420" valign="middle">CapCut, Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve</td><td width="150" valign="middle" nowrap><a href="src/video-studio/">Código</a>&nbsp;|&nbsp;<a href="https://vs.puter.com">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/vector-studio/"><img src="src/vector-studio/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/vector-studio/">Estúdio Vetorial</a></strong> <sub>(Vector Studio)</sub></td><td width="420" valign="middle">Adobe Illustrator, CorelDRAW, Affinity Designer</td><td width="150" valign="middle" nowrap><a href="src/vector-studio/">Código</a>&nbsp;|&nbsp;<a href="https://ves.puter.com">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/audio-studio/"><img src="src/audio-studio/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/audio-studio/">Estúdio de Áudio</a></strong> <sub>(Audio Studio)</sub></td><td width="420" valign="middle">Adobe Audition, Sound Forge</td><td width="150" valign="middle" nowrap><a href="src/audio-studio/">Código</a>&nbsp;|&nbsp;<a href="https://as.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/music-studio/"><img src="src/music-studio/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/music-studio/">Estúdio de Música</a></strong> <sub>(Music Studio)</sub></td><td width="420" valign="middle">FL Studio, Ableton Live, Logic Pro</td><td width="150" valign="middle" nowrap><a href="src/music-studio/">Código</a>&nbsp;|&nbsp;<a href="https://ms.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/3d/"><img src="src/3d/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/3d/">Estúdio 3D</a></strong> <sub>(3D Studio)</sub></td><td width="420" valign="middle">Autodesk Maya, SketchUp</td><td width="150" valign="middle" nowrap><a href="src/3d/">Código</a>&nbsp;|&nbsp;<a href="https://3d.puter.com">Demo original</a></td></tr>
</table>

<br>

## Engenharia

<table width="100%">
<tr><th width="296" align="left">Aplicativo</th><th width="420" align="left">Alternativa a</th><th width="150" align="left">Links</th></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/cad/"><img src="src/cad/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/cad/">CAD</a></strong> <sub>(CAD)</sub></td><td width="420" valign="middle">AutoCAD, DraftSight, BricsCAD</td><td width="150" valign="middle" nowrap><a href="src/cad/">Código</a>&nbsp;|&nbsp;<a href="https://cad.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/parametric/"><img src="src/parametric/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/parametric/">Paramétrico</a></strong> <sub>(Parametric)</sub></td><td width="420" valign="middle">SolidWorks, Autodesk Fusion, Autodesk Inventor</td><td width="150" valign="middle" nowrap><a href="src/parametric/">Código</a>&nbsp;|&nbsp;<a href="https://parametric.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/circuits/"><img src="src/circuits/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/circuits/">Circuitos</a></strong> <sub>(Circuits)</sub></td><td width="420" valign="middle">Altium Designer, Autodesk Eagle, OrCAD</td><td width="150" valign="middle" nowrap><a href="src/circuits/">Código</a>&nbsp;|&nbsp;<a href="https://circuits.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/building-design/"><img src="src/building-design/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/building-design/">Projeto de Edificações</a></strong> <sub>(Building Design)</sub></td><td width="420" valign="middle">Autodesk Revit, ArchiCAD, Vectorworks</td><td width="150" valign="middle" nowrap><a href="src/building-design/">Código</a>&nbsp;|&nbsp;<a href="https://bd.puter.com/">Demo original</a></td></tr>
</table>

<br>

## Produtividade

<table width="100%">
<tr><th width="296" align="left">Aplicativo</th><th width="420" align="left">Alternativa a</th><th width="150" align="left">Links</th></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/tasks/"><img src="./src/tasks/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/tasks/">Tarefas</a></strong> <sub>(Tasks)</sub></td><td width="420" valign="middle">Todoist, Microsoft To Do, TickTick</td><td width="150" valign="middle" nowrap><a href="src/tasks/">Código</a>&nbsp;|&nbsp;<a href="https://tasks.puter.com">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/projects/"><img src="src/projects/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/projects/">Projetos</a></strong> <sub>(Projects)</sub></td><td width="420" valign="middle">Trello, Asana, monday.com</td><td width="150" valign="middle" nowrap><a href="src/projects/">Código</a>&nbsp;|&nbsp;<a href="https://projects.puter.com">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/wiki/"><img src="src/wiki/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/wiki/">Wiki</a></strong> <sub>(Wiki)</sub></td><td width="420" valign="middle">Notion, Confluence, Coda</td><td width="150" valign="middle" nowrap><a href="src/wiki/">Código</a>&nbsp;|&nbsp;<a href="https://wiki.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/time-tracking/"><img src="./src/time-tracking/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/time-tracking/">Controle de Horas</a></strong> <sub>(Time Tracking)</sub></td><td width="420" valign="middle">Toggl Track, Harvest, Clockify</td><td width="150" valign="middle" nowrap><a href="src/time-tracking/">Código</a>&nbsp;|&nbsp;<a href="https://tt.puter.com">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/survey/"><img src="src/survey/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/survey/">Pesquisas</a></strong> <sub>(Surveys)</sub></td><td width="420" valign="middle">SurveyMonkey, Google Forms, Typeform</td><td width="150" valign="middle" nowrap><a href="src/survey/">Código</a>&nbsp;|&nbsp;<a href="https://survey.puter.com/">Demo original</a></td></tr>
</table>

<br>

## Finanças

<table width="100%">
<tr><th width="296" align="left">Aplicativo</th><th width="420" align="left">Alternativa a</th><th width="150" align="left">Links</th></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/accounting/"><img src="src/accounting/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/accounting/">Contabilidade</a></strong> <sub>(Accounting)</sub></td><td width="420" valign="middle">QuickBooks Online, Xero, Wave Accounting</td><td width="150" valign="middle" nowrap><a href="src/accounting/">Código</a>&nbsp;|&nbsp;<a href="https://accounting.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/invoicing/"><img src="src/invoicing/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/invoicing/">Faturamento</a></strong> <sub>(Invoicing)</sub></td><td width="420" valign="middle">FreshBooks, Zoho Invoice, Wave Invoicing</td><td width="150" valign="middle" nowrap><a href="src/invoicing/">Código</a>&nbsp;|&nbsp;<a href="https://invoicing.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/expense/"><img src="src/expense/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/expense/">Despesas</a></strong> <sub>(Expenses)</sub></td><td width="420" valign="middle">Expensify, SAP Concur, Zoho Expense</td><td width="150" valign="middle" nowrap><a href="src/expense/">Código</a>&nbsp;|&nbsp;<a href="https://expenses.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/cap-table/"><img src="src/cap-table/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/cap-table/">Tabela de Capitalização</a></strong> <sub>(Cap Table)</sub></td><td width="420" valign="middle">Carta, Pulley</td><td width="150" valign="middle" nowrap><a href="src/cap-table/">Código</a>&nbsp;|&nbsp;<a href="https://captable.puter.com/">Demo original</a></td></tr>
</table>

<br>

## Negócios

<table width="100%">
<tr><th width="296" align="left">Aplicativo</th><th width="420" align="left">Alternativa a</th><th width="150" align="left">Links</th></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/crm/"><img src="src/crm/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/crm/">CRM</a></strong> <sub>(CRM)</sub></td><td width="420" valign="middle">Salesforce, HubSpot CRM, Pipedrive</td><td width="150" valign="middle" nowrap><a href="src/crm/">Código</a>&nbsp;|&nbsp;<a href="https://crm.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/help-desk/"><img src="src/help-desk/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/help-desk/">Central de Atendimento</a></strong> <sub>(Help Desk)</sub></td><td width="420" valign="middle">Zendesk, Freshdesk, Intercom, Help Scout</td><td width="150" valign="middle" nowrap><a href="src/help-desk/">Código</a>&nbsp;|&nbsp;<a href="https://help.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/contracts/"><img src="src/contracts/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/contracts/">Contratos</a></strong> <sub>(Contracts)</sub></td><td width="420" valign="middle">ContractSafe, Juro</td><td width="150" valign="middle" nowrap><a href="src/contracts/">Código</a>&nbsp;|&nbsp;<a href="https://contracts.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/pos/"><img src="src/pos/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/pos/">Ponto de Venda</a></strong> <sub>(Point of Sale)</sub></td><td width="420" valign="middle">Square POS, Shopify POS, Lightspeed</td><td width="150" valign="middle" nowrap><a href="src/pos/">Código</a>&nbsp;|&nbsp;<a href="https://pos.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/inventory/"><img src="src/inventory/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/inventory/">Estoque</a></strong> <sub>(Inventory)</sub></td><td width="420" valign="middle">Zoho Inventory, Sortly, inFlow Inventory</td><td width="150" valign="middle" nowrap><a href="src/inventory/">Código</a>&nbsp;|&nbsp;<a href="https://inventory.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/assets/"><img src="src/assets/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/assets/">Patrimônio</a></strong> <sub>(Assets)</sub></td><td width="420" valign="middle">Asset Panda, EZOfficeInventory</td><td width="150" valign="middle" nowrap><a href="src/assets/">Código</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/hiring/"><img src="src/hiring/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/hiring/">Recrutamento</a></strong> <sub>(Hiring)</sub></td><td width="420" valign="middle">Greenhouse, Lever, Workable</td><td width="150" valign="middle" nowrap><a href="src/hiring/">Código</a>&nbsp;|&nbsp;<a href="https://hiring.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/shifts/"><img src="src/shifts/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/shifts/">Shifts</a></strong> <sub>(Shifts)</sub></td><td width="420" valign="middle">Deputy, When I Work, Homebase</td><td width="150" valign="middle" nowrap><a href="src/shifts/">Código</a>&nbsp;|&nbsp;<a href="https://shifts.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/childcare/"><img src="src/childcare/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/childcare/">Creche</a></strong> <sub>(Childcare)</sub></td><td width="420" valign="middle">brightwheel, Procare, HiMama</td><td width="150" valign="middle" nowrap><a href="src/childcare/">Código</a>&nbsp;|&nbsp;<a href="https://childcare.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/field-service/"><img src="src/field-service/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/field-service/">Serviços de Campo</a></strong> <sub>(Field Service)</sub></td><td width="420" valign="middle">Jobber, Housecall Pro, ServiceTitan</td><td width="150" valign="middle" nowrap><a href="src/field-service/">Código</a>&nbsp;|&nbsp;<a href="https://fieldservice.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/legal/"><img src="src/legal/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/legal/">Jurídico</a></strong> <sub>(Legal)</sub></td><td width="420" valign="middle">Clio, MyCase, PracticePanther</td><td width="150" valign="middle" nowrap><a href="src/legal/">Código</a>&nbsp;|&nbsp;<a href="https://legal.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/fleet/"><img src="src/fleet/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/fleet/">Frota</a></strong> <sub>(Fleet)</sub></td><td width="420" valign="middle">Fleetio, Samsara Fleet Maintenance, Whip Around</td><td width="150" valign="middle" nowrap><a href="src/fleet/">Código</a>&nbsp;|&nbsp;<a href="https://fleet.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/property-management/"><img src="src/property-management/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/property-management/">Gestão de Imóveis</a></strong> <sub>(Property Management)</sub></td><td width="420" valign="middle">Buildium, AppFolio, Rent Manager</td><td width="150" valign="middle" nowrap><a href="src/property-management/">Código</a></td></tr>
</table>

<br>

## Desenvolvimento

<table width="100%">
<tr><th width="296" align="left">Aplicativo</th><th width="420" align="left">Alternativa a</th><th width="150" align="left">Links</th></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/api-client/"><img src="src/api-client/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/api-client/">Cliente de API</a></strong> <sub>(API Client)</sub></td><td width="420" valign="middle">Postman, Insomnia, Hoppscotch</td><td width="150" valign="middle" nowrap><a href="src/api-client/">Código</a>&nbsp;|&nbsp;<a href="https://apic.puter.com/">Demo original</a></td></tr>
</table>

<br>

## Jogos

<table width="100%">
<tr><th width="296" align="left">Application</th><th width="420" align="left">Descrição</th><th width="150" align="left">Links</th></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/chess/"><img src="src/chess/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/chess/">Xadrez</a></strong> <sub>(Chess)</sub></td><td width="420" valign="middle">Jogue contra o computador ou um amigo, com relógio e partidas online.</td><td width="150" valign="middle" nowrap><a href="src/chess/">Código</a>&nbsp;|&nbsp;<a href="https://chess.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/backgammon/"><img src="src/backgammon/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/backgammon/">Gamão</a></strong> <sub>(Backgammon)</sub></td><td width="420" valign="middle">Jogue contra o computador ou um amigo, no mesmo aparelho ou online.</td><td width="150" valign="middle" nowrap><a href="src/backgammon/">Código</a>&nbsp;|&nbsp;<a href="https://backgammon.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/checkers/"><img src="src/checkers/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/checkers/">Damas</a></strong> <sub>(Checkers)</sub></td><td width="420" valign="middle">Damas americanas contra o computador ou um amigo.</td><td width="150" valign="middle" nowrap><a href="src/checkers/">Código</a>&nbsp;|&nbsp;<a href="https://checkers.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/solitaire/"><img src="src/solitaire/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/solitaire/">Paciência</a></strong> <sub>(Solitaire)</sub></td><td width="420" valign="middle">Paciência Klondike (comprando uma ou três, com pontuação Vegas opcional) e Paciência Spider, com salvamento opcional na nuvem.</td><td width="150" valign="middle" nowrap><a href="src/solitaire/">Código</a>&nbsp;|&nbsp;<a href="https://solitaire.puter.com/">Demo original</a></td></tr>
<tr><td width="296" valign="middle" nowrap><a href="src/sudoku/"><img src="src/sudoku/icon-128.png" width="48" height="48" alt="" align="center"></a> &nbsp; <strong><a href="src/sudoku/">Sudoku</a></strong> <sub>(Sudoku)</sub></td><td width="420" valign="middle">Quatro níveis de dificuldade, desafios diários e dicas que explicam a lógica.</td><td width="150" valign="middle" nowrap><a href="src/sudoku/">Código</a>&nbsp;|&nbsp;<a href="http://sudoku.puter.com/">Demo original</a></td></tr>
</table>

<br>

## Licença

Este repositório, incluindo todo o seu conteúdo, subprojetos, módulos e componentes, é licenciado sob a [MIT](LICENSE), salvo indicação explícita em contrário. Bibliotecas de terceiros incluídas podem estar sujeitas às suas próprias licenças.

Copyright do código original: veja [LICENSE](LICENSE) (HeyPuter). Tradução e adaptações em português: belchiorjuniorr2, também sob MIT.
