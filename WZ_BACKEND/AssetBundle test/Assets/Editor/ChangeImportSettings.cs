using UnityEditor;
using UnityEngine;


public class ChangeImportSettings : AssetPostprocessor
{
    public void OnPreprocessModel()
    {
        ModelImporter modelImporter = (ModelImporter)assetImporter;
        modelImporter.addCollider = true;
    }

    public void OnPostprocessTexture(Texture2D texture)
    {
        TextureImporter textureImporter = (TextureImporter)assetImporter;
        textureImporter.maxTextureSize = 2048;
    }

    
}