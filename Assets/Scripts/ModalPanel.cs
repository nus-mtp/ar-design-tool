using UnityEngine;
using UnityEngine.UI;
using UnityEditor;
using System.Collections;

public class ModalPanel : MonoBehaviour {
    
    // For description text height
    private float fontSize = 142.53528f;
    private float posYPerLine = 35f;
    private float initPosY = -1020f;

    // For scrolling
    private float minHeight = 3000f;

    public GameObject UIObject;
    private static ModalPanel modalPanel;

    public static ModalPanel Instance() {
        if(!modalPanel)
        {
            modalPanel = FindObjectOfType(typeof(ModalPanel)) as ModalPanel;
            if(!modalPanel)
            {
                Debug.LogError("Attach ModalPanel.cs to UI Manager");
            }
        }
        return modalPanel;
    }
    
    public void Display(string title, string lim, string rim, string desc)
    {
        GameObject Title = GameObject.Find("Title");
        GameObject LeftImage = GameObject.Find("LeftImage");
        GameObject RightImage = GameObject.Find("RightImage");
        GameObject Description = GameObject.Find("Description");
        if(!Title)
        {
            Debug.LogError("Title is not found");
        }
        if (!LeftImage)
        {
            Debug.LogError("LeftImage is not found");
        }
        if (!RightImage)
        {
            Debug.LogError("RightImage is not found");
        }
        if (!Description)
        {
            Debug.LogError("Description is not found");
        }
        Title.GetComponent<Text>().text = title;
        Description.GetComponent<Text>().text = desc;
        if(lim != null)
        {
            LeftImage.GetComponent<Image>().sprite = Sprite.Create(
                AssetDatabase.LoadAssetAtPath(lim, typeof(Texture2D)) as Texture2D,
                LeftImage.GetComponent<Rect>(), Vector2.zero);
        }
        if (rim != null)
        {
            LeftImage.GetComponent<Image>().sprite = Sprite.Create(
                AssetDatabase.LoadAssetAtPath(rim, typeof(Texture2D)) as Texture2D,
                LeftImage.GetComponent<Rect>(), Vector2.zero);
        }

        float newContainerBottom = Description.GetComponent<Text>().preferredHeight < minHeight ? 0 : (minHeight - Description.GetComponent<Text>().preferredHeight) / 2;
        float newTextPosY = initPosY - posYPerLine * (Description.GetComponent<Text>().preferredHeight / fontSize - 1);
        Debug.Log("Height: " + UIObject.GetComponent<Image>().minHeight);
        Description.GetComponent<RectTransform>().anchoredPosition = new Vector2(UIObject.GetComponent<RectTransform>().anchoredPosition.x, newTextPosY);
        UIObject.GetComponent<RectTransform>().offsetMin = new Vector2(0, newContainerBottom);
        UIObject.SetActive(true);
    }

    public void Close()
    {
        UIObject.SetActive(false);
    }
}