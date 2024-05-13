# kangukangu.github.io
This repository contains the source for [leshi.kangu.info](https://leshi.kangu.info).

## Editing the website

### How to add a marker to a map
Simply add a markdown file to `content/map` or `content/gronow`.
#### Frontmatter
´´´toml
+++
title = <Location name>
type = "marker"
xPos = <xcoord>
yPos = <ycoord>
markerstyle = [optional]"<markerstyle>"
goto = [optional]"<gotolink>"
+++
´´´
`<markerstyle>` must be a png that exists in `static/img`. If a class `.<markerstyle>` is added to `asset/style.css` it is used for the element. This is primarily intended in order to use markers of various sizes. If no markerstyle is given the default marker will be used.

`<gotolink>` will cause the "venture" butto to appear at the bottom of the infobox and open the provided link in the current tab.
#### Figuring out the appropriate coordiants
The easiest way to find the correct coordiants for a new marker is
* opening the associated map-page in a browser
* open the developer tools/web inspector (F12 in most browsers)
* Find an existing marker
* manipulate the css values `--x` and `--y` until the marker appears in the position the new marker is supposed to go
* copy the values to the `xPos` and `yPos` in the frontmatter of the new .md file

#### Links to maplocations
Create a link referencing a maplocation by adding `/?<markername>)` to a link to a map where `markername` needs to refer to the filename of a marker that exists on the map. E.g. `[the Castle](/map/?castle)` will open the worldmap, center on the castle and open the infotext.

### How to add characters or quests
Simply add a markdown file to `content/characters` or `content/quests`.
#### Frontmatter
**Quest**
```toml
+++
title = <Title>
status = [optional]"<angenommen/nicht angenommen/...>"
status_p = [optional]"<abgeschlossen/...>"
status_n = [optional]"<ungelöst/...>"
weight = [optional]<1-9 = aktiv, 10-99 = nicht angenommen, 100+ = gelöst>
+++
```
**Character**
```toml
+++
title = "<Name>"
subtitle = "<Klasse, Origin>"
dndbeyond= "<dndbeyond Link>"
avatar= "<avatar path>"
+++
```

### How to edit the ressources page
The ressources page is generated from a single markdown file located at `content/ressources/index.md`.

## Dependencies
The website is build with [hugo](https://gohugo.io/). 

The website uses [anvaka/panzoom](https://github.com/anvaka/panzoom) for panning and zooming of maps.