using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LitJson;

public class Ingredient : IComparable<Ingredient>
{

    //Attributes
    public string name { get; set; }
    public List<string> alternativeNames { get; set; }
    public List<string> imageLocation { get; set; }
    public string description { get; set; }

    //Blank Constructor for litJson to work
    public Ingredient()
    {
    }

    //Constructor
    public Ingredient(string name, List<string> alternativeNames, List<string> imageLocation, string description)
    {
        this.name = name;
        this.alternativeNames = alternativeNames;
        this.imageLocation = imageLocation;
        this.description = description;
    }



    //Override equals method
    public override bool Equals(System.Object obj)
    {
        // If parameter is null return false.
        if (obj == null)
        {
            return false;
        }

        // If parameter cannot be cast to Ingredient return false.
        Ingredient other = obj as Ingredient;
        if ((System.Object)other == null)
        {
            return false;
        }

        // Return true if the fields match:
        bool alternativeNamesEqual = true;
        bool imageLocationEqual = true;

        alternativeNamesEqual = areliststEqual<string>(this.alternativeNames, other.alternativeNames);
        imageLocationEqual = areliststEqual<string>(this.imageLocation, other.imageLocation);

        return (this.name.Equals(other.name)) && alternativeNamesEqual && imageLocationEqual && (this.description.Equals(other.description));
    }

    private bool areliststEqual<T>(List<T> a, List<T> b)
    {
        if (a.Count != b.Count)
            return false;
        a.Sort();
        b.Sort();

        for (int i = 0; i < a.Count; i++)
        {
            if (!a[i].Equals(b[i]))
            {
                return false;
            }
        }

        return true;
    }
    //Override compareTo only consider ingredients name
    public int CompareTo(Ingredient other)
    {
        return this.name.CompareTo(other.name);
    }

    //overwriting toString method
    public override string ToString()
    {
        string output = "";
        output += "Name: " + this.name + "\n";
        output += "Common Names: " + this.alternativeNames.ToString() + "\n";
        output += "Image: " + this.imageLocation.ToString() + "\n";
        output += "Description: " + this.description;

        return output;

    }

    public string toJSON()
    {
        string jsonString = JsonMapper.ToJson(this);
        return jsonString;
    }

    public static Ingredient fromJson(String input)
    {
        Ingredient ingredient = JsonMapper.ToObject<Ingredient>(@input);
        return ingredient;
    }

}