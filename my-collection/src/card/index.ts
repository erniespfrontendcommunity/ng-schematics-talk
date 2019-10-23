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
import {getWorkspace} from "@schematics/angular/utility/config";
import {parseName} from "@schematics/angular/utility/parse-name";
import {buildDefaultPath} from "@schematics/angular/utility/project";
import {strings} from "@angular-devkit/core";

/*
This function es used by the init function to get the workspace object and apply a little conversion in the name of element that will be created.
 */
export function setupOptions(host: Tree, options: any): Tree {
  const workspace = getWorkspace(host);
  const projectKey = Object.keys(workspace.projects)[0];
  const project = workspace.projects[projectKey];
  options.path = buildDefaultPath(project);
  const parsedPath = parseName(options.path, options.name);
  options.name = parsedPath.name + '-card';
  return host;
}

/*
This function is the first function executed when schema is thrown.
In that case, an initial path is prepared and files on the files folder are
copied at result path.
Note: dasherize function convert the name given by params in a valid name to file.
 */
export function init(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, options);
    const movePath = normalize(options.path + '/' + strings.dasherize(options.name));
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);
    return rule(tree, _context);
  };
}
