import {
  apply,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { normalize } from 'path';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function myCollection(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, _options);
    const movePath = normalize(_options.path + '/' + strings.dasherize(_options.name));
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ..._options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);
    return rule(tree, _context);
  };
}

export function setupOptions(host: Tree, _options: any): Tree {
  const workspace = getWorkspace(host);
  const projectKey = Object.keys(workspace.projects)[0];
  const project = workspace.projects[projectKey];
  _options.path = buildDefaultPath(project);
  const parsedPath = parseName(_options.path, _options.name);
  _options.name = parsedPath.name + '-card';
  return host;
}

