using UnityEditor;


public class GenerateCollider : AssetPostprocessor
{
    public void OnPreprocessModel()
    {
        ModelImporter modelImporter = (ModelImporter)assetImporter;
        modelImporter.addCollider = true;
    }
}