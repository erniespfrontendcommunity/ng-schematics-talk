import {
  apply, FileEntry, forEach,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { join, normalize } from 'path';
import {getWorkspace} from "@schematics/angular/utility/config";

/*
Like the another case, this function is used by de init function for load the current workspace and the properly project
and to set the src folder as the work root to overwrite files.
 */
export function setupOptions(host: Tree, options: any): Tree {
  const workspace = getWorkspace(host);
  const projectKey = Object.keys(workspace.projects)[0];
  const project = workspace.projects[projectKey];
  options.path = join(normalize(project.root), 'src');
  return host;
}

/*
In that init function, path inside of file folder in our project
is aligned with the root of project in which this schema will be applied to overwrite the app-component files.
 */
export function init(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, _options);
    const movePath = normalize(_options.path + '/');
    const templateSource = apply(url('./files/src'), [
      template({..._options}),
      move(movePath),
      forEach((fileEntry: FileEntry) => {
        if(tree.exists(fileEntry.path)) {
          tree.overwrite(fileEntry.path, fileEntry.content);
        }
        return fileEntry;
      })
    ]);
    const rule = mergeWith(templateSource, MergeStrategy.Overwrite);
    return rule(tree, _context);
  };
}
